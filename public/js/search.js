const searchNutritionixHandler = async (event) => {
    event.preventDefault();

    const food_name = document.querySelector('#nutritionixsearch').value.trim();

    console.log(food_name)

    if (food_name) {
        window.location.replace(`/search?q=${food_name}`)
    }
};



document
    .querySelector('.nutritionixsearch-form')
    .addEventListener('submit', searchNutritionixHandler)