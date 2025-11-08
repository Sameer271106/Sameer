// ======= Navigation =======
const homeBtn = document.getElementById('homeBtn');
const registerBtn = document.getElementById('registerBtn');
const adminBtn = document.getElementById('adminBtn');

const homeSection = document.getElementById('homeSection');
const registerSection = document.getElementById('registerSection');
const adminSection = document.getElementById('adminSection');

function showSection(section) {
  [homeSection, registerSection, adminSection].forEach(s => s.classList.add('hidden'));
  section.classList.remove('hidden');
}

homeBtn.onclick = () => showSection(homeSection);
registerBtn.onclick = () => showSection(registerSection);
adminBtn.onclick = () => showSection(adminSection);

// ======= Captcha Generator =======
function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let captcha = '';
  for (let i = 0; i < 5; i++) captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  document.getElementById('captchaText').textContent = captcha;
}
generateCaptcha();
document.getElementById('refreshCaptcha').onclick = generateCaptcha;

// ======= Registration Form =======
document.getElementById('registrationForm').onsubmit = function(e) {
  e.preventDefault();
  const dob = new Date(document.getElementById('dob').value);
  const age = new Date().getFullYear() - dob.getFullYear();
  if (age < 18) return alert('You must be at least 18 years old.');

  const captchaInput = document.getElementById('captchaInput').value.trim();
  if (captchaInput !== document.getElementById('captchaText').textContent)
    return alert('Invalid captcha.');

  const user = {
    name: document.getElementById('name').value,
    dob: document.getElementById('dob').value,
    gender: document.getElementById('gender').value,
    address: document.getElementById('address').value,
    aadhaar: document.getElementById('aadhaar').value,
    email: document.getElementById('email').value,
    mobile: document.getElementById('mobile').value,
    status: 'Pending'
  };

  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));

  alert('Registration submitted successfully!');
  this.reset();
  generateCaptcha();
};

// ======= Admin Login =======
document.getElementById('adminLoginForm').onsubmit = function(e) {
  e.preventDefault();
  const user = document.getElementById('adminUser').value;
  const pass = document.getElementById('adminPass').value;

  if (user === 'admin' && pass === 'Admin@123') {
    document.getElementById('adminDashboard').classList.remove('hidden');
    loadUserTable();
  } else {
    alert('Invalid credentials!');
  }
};

// ======= Admin Dashboard Table =======
function loadUserTable() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const tbody = document.getElementById('userTableBody');
  tbody.innerHTML = '';

  users.forEach((u, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.status}</td>
      <td>
        <button onclick="approveUser(${index})">Approve</button>
        <button onclick="rejectUser(${index})">Reject</button>
      </td>`;
    tbody.appendChild(row);
  });
}

function approveUser(index) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users[index].status = 'Approved';
  localStorage.setItem('users', JSON.stringify(users));
  loadUserTable();
}

function rejectUser(index) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users[index].status = 'Rejected';
  localStorage.setItem('users', JSON.stringify(users));
  loadUserTable();
}
