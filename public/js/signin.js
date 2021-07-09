const signupFormHandler = async (event) => {
  event.preventDefault();

  // console.log('vvvvvvvvvvvvvvvvv');
  // console.log(event);

  const name = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // console.log(`Name: ${name}`); // ****
  // console.log(`Email: ${email}`);  // ****
  // console.log(`Password: ${password}`);  // ****

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

// console.log('wwwwwwwwwwwwwww');
// console.log(document);
// console.log('********sign-up form');
// console.log(document.querySelector('.signup-form'))

// document
//   .querySelector('.login-form')
//   .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
