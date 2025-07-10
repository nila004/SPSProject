document.addEventListener('DOMContentLoaded', function () {
  const loginBtn = document.getElementById('loginBtn');

  loginBtn.addEventListener('click', function () {
    const name = document.getElementById('member').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!name || !password) {
      alert('Please enter both Membership ID and password.');
      return;
    }
    
    fetch('http://192.168.1.6:3000/volunteer/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Login successful!');
            // ✅ Save login status in sessionStorage
          sessionStorage.setItem('volunteerLoggedIn', 'true');
          window.location.href = '/eventd'; // Redirect to volunteer dashboard
        } else {
          alert('Login failed: ' + data.message);
        }
      })
      .catch(err => {
        alert('Error: ' + err.message);
      });
  });
});
