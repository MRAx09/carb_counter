var toCurrentMealBtn = $(".go-to-current-meal");

toCurrentMealBtn.click(async function () {
    console.log('IN CLICK')
    if (localStorage.getItem("currentMealFoods") === null) {
        // window.location.replace(`/nofoodsincurrentmeal`) 
        //above prob not best way as there is nothing from database to do a CRUD with

        console.log('CURRENT MEAL EMPTY - need way to show to user')
        
        //can we put here a way to make some html visible only in this if statement?
        //or maybe a modal?
    }
    else {
        const theFoods = JSON.parse(localStorage.getItem("currentMealFoods"))
        window.location.replace(`/currentmeal?q=${theFoods}`)

    }
})



var addBtn = $(".addBtn");

addBtn.click(async function () {
    if (this.hasAttribute('addToCurBtn-id')) {
      const id = this.getAttribute('addToCurBtn-id');
        console.log('IDDDDDDDDDDDDDDDDDD');
        console.log(id);
        const stringId = JSON.stringify(id)
        console.log('stringID:     ', stringId)

        var currentStored;

        if (localStorage.getItem("currentMealFoods") === null) {
            currentStored = [];
        }
        else {
            // currentStored = [];
            currentStored = JSON.parse(localStorage.getItem("currentMealFoods"))
        }

        console.log('currentStored:     ', currentStored);
        // let array = Array.from(currentStored)
        currentStored.push(stringId)
        console.log('now currentStored:     ', currentStored);

        localStorage.setItem("currentMealFoods", JSON.stringify(currentStored))

        console.log('currentStored line 78:        ', currentStored)
        
        //go to currentmeal get route and send list of food ids
        window.location.replace(`/currentmeal?q=${currentStored}`)
        // window.location.replace(`/?q=${currentStored}`)

    }

  });




//savebuttonhandler function

//add save for current meal, post method, put route in homeroutes
//then clear local storage



//save meal listener - save meal handler

const saveCurrentMealHandler = async (event) => {
    event.preventDefault();
    console.log('blah blah blah blah');
    console.log(event);

    const mealname = document.querySelector('#current-meal-name').value.trim();
    console.log(`This is the meal name: ${mealname}`);
    const foodIds = localStorage.getItem("currentMealFoods");  
    console.log('foodIds:     ', foodIds)
  
  
    const response = await fetch('/api/meals/', {
      method: 'POST',
      body: JSON.stringify({ mealname, foodIds }),
      headers: { 'Content-Type': 'application/json' },
    });

    // if (response.ok) {
    //   document.location.replace('/');   
    // } else {
    //   alert('Failed to save meal.');
    // }
   
  };




  document
  .querySelector('.cur-meal-save-button')
  .addEventListener('click', saveCurrentMealHandler);




