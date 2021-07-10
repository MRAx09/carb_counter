const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/meals/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/api/meals/savedmeals');
    } else {
      alert('Failed to delete meal');
    }
  }
};

document
  .querySelector('.delete-btn')
  .addEventListener('click', delButtonHandler);