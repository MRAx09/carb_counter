var delMealBtn = $('.deleteBtn-m');
// var delMealBtn = $('#delete-btn');
console.log('~~~~~~~   ~~~~~~~   ~~~~~~~');
delMealBtn.click(async function () {
  console.log('-------del button handler------');
  if (this.hasAttribute('mealDelBtn-id')) {
    console.log('It has the attribute');
    const id = this.getAttribute('mealDelBtn-id');
    console.log(id);

    const response = await fetch(`/api/meals/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // document.location.replace('/api/meals/savedmeals');
       document.location.replace('/');

    } else {
      alert('Failed to delete meal');
    }
  }
});

