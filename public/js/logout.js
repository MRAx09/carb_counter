const logoutHandler = async () => {
  // Make a POST request to destroy the session on the back end
  // console.log('in logouthandler');

  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    // If successfully logged out, redirect to the login page
    alert("logged out");
    document.location.replace('/login');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logoutHandler);
// document.querySelector('#initialBtns').addEventListener('click', logoutHandler);
