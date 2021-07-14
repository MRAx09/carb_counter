const delButtonHandler = async (event) => {
  console.log('-------del button handler------');
  if (event.target.hasAttribute('mealDelBtn-id')) {
    console.log('It has the attribute');
    const id = event.target.getAttribute('mealDelBtn-id');
    console.log(id);

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
  .querySelector('#delete-btn')
  .addEventListener('click', delButtonHandler);