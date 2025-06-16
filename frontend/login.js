document.addEventListener('DOMContentLoaded', function () {
  const loginBtn = document.getElementById('loginBtn');

  loginBtn.addEventListener('click', function () {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    // Sample POST to backend
    fetch('/login-volunteer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Login successful!');
          window.location.href = '/dashboard';
        } else {
          alert('Login failed: ' + data.message);
        }
      })
      .catch(err => {
        alert('Error: ' + err.message);
      });
  });
});
