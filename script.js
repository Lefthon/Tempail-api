const createBtn = document.getElementById('createEmailBtn');
const emailSection = document.getElementById('emailSection');
const emailText = document.getElementById('emailText');
const expireText = document.getElementById('expireText');
const messageList = document.getElementById('messageList');

let token = '';

createBtn.addEventListener('click', async () => {
  const res = await fetch('/api/create-email').then(r => r.json());

  if (res.status === 'success') {
    emailSection.classList.remove('hidden');
    emailText.textContent = res.data.email;
    expireText.textContent = new Date(res.data.deleted_in).toLocaleTimeString();
    token = res.data.email_token;

    pollMessages();
  } else {
    alert('Gagal buat email');
  }
});

async function pollMessages() {
  const res = await fetch(`/api/messages/${token}`).then(r => r.json());

  if (res.status === 'success') {
    messageList.innerHTML = '';
    res.data.messages.forEach(msg => {
      const div = document.createElement('div');
      div.className = 'bg-zinc-800 p-3 rounded';
      div.innerHTML = `
        <strong>${msg.subject || 'Tanpa Subjek'}</strong><br/>
        Dari: ${msg.from_email}
      `;
      div.onclick = () => openMessage(msg.id);
      messageList.appendChild(div);
    });
  }
  setTimeout(pollMessages, 5000);
}

async function openMessage(id) {
  const res = await fetch(`/api/message/${id}`).then(r => r.json());

  if (res.status === 'success') {
    alert(`Subjek: ${res.data[0].subject}\n\n${res.data[0].content}`);
  } else {
    alert('Gagal buka pesan');
  }
}
const loader = document.getElementById('loader');

function showLoader() {
  loader.classList.remove('hidden');
}
function hideLoader() {
  loader.classList.add('hidden');
}

createBtn.addEventListener('click', async () => {
  showLoader();
  const res = await fetch('/api/create-email').then(r => r.json());
  hideLoader();

  if (res.status === 'success') {
    emailSection.classList.remove('hidden');
    emailText.textContent = res.data.email;
    expireText.textContent = new Date(res.data.deleted_in).toLocaleTimeString();
    token = res.data.email_token;

    pollMessages();
  } else {
    alert('Gagal buat email');
  }
});
