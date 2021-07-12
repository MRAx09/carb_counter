
const createCustomFoodHandler = async (event) => {
    event.preventDefault();


    const food_name = document.querySelector('#food-name').value.trim();
    const serving_qty = document.querySelector('#serving_qty').value.trim();
    const serving_unit = document.querySelector('#serving_unit').value.trim();
    const serving_weight_grams = document.querySelector('#serving_weight_grams').value.trim();  
    const nf_total_carbohydrates = document.querySelector('#nf-total-carbohydrates').value.trim();
    const nf_dietary_fiber = document.querySelector('#nf-dietary-fiber').value.trim();

    console.log(food_name)
    console.log(serving_qty)
    console.log(serving_unit)
    console.log(serving_weight_grams)
    console.log(nf_total_carbohydrates)
    console.log(nf_dietary_fiber)

    if (food_name && serving_qty && serving_unit && nf_total_carbohydrates) {
        const response = await fetch('/api/foods/createfood', {
            method: 'POST',
            body: JSON.stringify({ food_name, serving_qty, serving_unit, serving_weight_grams, nf_total_carbohydrates, nf_dietary_fiber}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('***************')
        console.log(response)

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to create food item')
        }
    }
};   

document
    .querySelector('.customfood-form')
    .addEventListener('submit', createCustomFoodHandler)