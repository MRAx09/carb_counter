var toCurrentMealBtn = $(".go-to-current-meal");

toCurrentMealBtn.click(async function () {
    console.log('IN CLICK')
    if (localStorage.getItem("currentMealFoods") === null) {
        

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
           
            currentStored = JSON.parse(localStorage.getItem("currentMealFoods"))
        }

        console.log('currentStored:     ', currentStored);
        
        currentStored.push(stringId)
        console.log('now currentStored:     ', currentStored);

        localStorage.setItem("currentMealFoods", JSON.stringify(currentStored))

        console.log('currentStored line 78:        ', currentStored)
        
        //go to currentmeal get route and send list of food ids
        window.location.replace(`/currentmeal?q=${currentStored}`)
        

    } else {
        console.log('NO ID')
    }

  });


  



  var searchtocurrentBtn = $(".search-to-current");

searchtocurrentBtn.click(async function () {
    console.log('IN CLICK')
    if (this.hasAttribute('search-to-current-id')) {
        const name = this.getAttribute('search-to-current-id');
          console.log('NAME:      ', name);
  
          
          //go to currentmeal get route and send list of food ids
          window.location.replace(`/searchtocurrent?q=${name}`)
          
  
      } else {
          return
      }
});




var saveMealBtn = $(".cur-meal-save-button");
saveMealBtn.click(async function () {
  const mealname = document.querySelector('#current-meal-name').value.trim();
    console.log(`This is the meal name: ${mealname}`);
    const foodIds = localStorage.getItem("currentMealFoods");  
    console.log('foodIds:     ', foodIds)

    const response = await fetch('/api/meals/', {
      method: 'POST',
      body: JSON.stringify({ mealname, foodIds }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
       localStorage.removeItem("currentMealFoods")
      document.location.replace('/');   
    } else {
      alert('Failed to save meal.');
    }
});



//Add to favorites button
var favBtn = $(".addFavButton");
favBtn.click(async function () {

    const food_id = this.getAttribute('foodFavBtn-id');
        console.log('IDDDDDDDDDDDDDDDDDD');
        console.log(food_id);

 
   
    const response = await fetch('/api/foods/addfavorite', {
      method: 'POST',
      body: JSON.stringify({ food_id }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/');   
    } else {
      alert('Failed to add to favorites');
    }
});




