// Wherever the listener is for the nutritionix api call, needs to link this js file. 
//I don't currently have the html for the search field, so we can just connect the two when we have both in same branch


const searchNutritionixHandler = async (event) => {
    event.preventDefault();

    const food_name = document.querySelector('#nutritionixsearch').value.trim();
    console.log(food_name)

    if (food_name) {
        const response = await fetch('/search', {
            method: 'POST',
            body: JSON.stringify({ food_name }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('***************')
        console.log(response)

        if (response.ok) {
            console.log('HERE')
            console.log(food_name)
            document.location.replace(`/api/foods/${food_name}`);
            console.log(response) 
        } else {
            alert('Failed to search')
        }
    }


};



document
    .querySelector('.nutritionixsearch-form')
    .addEventListener('submit', searchNutritionixHandler)


