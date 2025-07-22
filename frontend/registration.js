document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const membershipSelect = document.getElementById('membership');
  const membershipIdDiv = document.getElementById('membershipIdDiv');
  const responseMsg = document.getElementById('responseMsg');

  membershipSelect.addEventListener('change', () => {
    if (membershipSelect.value === 'IEEE Member' || membershipSelect.value === 'SPS Member') {
      membershipIdDiv.style.display = 'block';
      document.getElementById('membershipId').required = true;
    } else {
      membershipIdDiv.style.display = 'none';
      document.getElementById('membershipId').required = false;
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: form.name.value,
      college: form.college.value,
      year: form.year.value,
      membership: form.membership.value,
      membershipId: form.membershipId.value || '',
      food: form.food.value
    };

    try {
      const response = await fetch('/participants/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      responseMsg.textContent = result.message;
      responseMsg.style.color = result.success ? 'green' : 'red';
      if (result.success) form.reset();
    } catch (error) {
      console.error(error);
      responseMsg.textContent = 'Something went wrong.';
      responseMsg.style.color = 'red';
    }
  });
});
