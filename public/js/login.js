const loginFormHandler = async (event) => {
  event.preventDefault();

  console.log(event);

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
      alert('Logged in');   
    } else {
      alert('Failed to log in.');
    }
  } else {
    alert('Enter an email and a password.');
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

// document
//   .querySelector('.signup-form')
//   .addEventListener('submit', signupFormHandler);
