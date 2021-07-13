// const addToCurrentMealHandler = async (event) => {
//     event.preventDefault();
//     if (event.target.hasAttribute('data-id')) {
//       const id = event.target.getAttribute('data-id');

//       console.log(id)
  
//     //   const response = await fetch(`/api/posts/${id}`, {
//     //     method: 'DELETE',
//     //   });
  
//     //   if (response.ok) {
//     //     document.location.replace('/dashboard');
//     //   } else {
//     //     alert('Failed to delete post');
//     //   }
//     }
//   };




//   document
//   .querySelector('.addToCur')
//   .addEventListener('click', addToCurrentMealHandler);
var listOfFoodIds = [];
var getStored;
var addBtn = $(".addBtn");

addBtn.click(async function () {
    if (this.hasAttribute('addToCurBtn-id')) {
      const id = this.getAttribute('addToCurBtn-id');
        console.log('IDDDDDDDDDDDDDDDDDD');
        console.log(id);

        listOfFoodIds.push(id);
        
        localStorage.setItem("currentMealFoods", listOfFoodIds);



        console.log("list if food IDs *********    ", listOfFoodIds);
        const list = JSON.stringify(listOfFoodIds);
        console.log("$$$$$ list $$$$$$$$$$$    ", list)

        //go to currentmeal get route and send list of food ids
        window.location.replace(`/currentmeal?q=${listOfFoodIds}`)

    }

  });


function getLocal ()  {
    getStored = localStorage.getItem("currentMealFoods")

    console.log('getStored......     ', getStored);
}


window.onload = function () {
    getLocal();
}


//savebuttonhandler function

//add save for current meal, post method, put route in homeroutes
//then clear local storage



//save meal listener - save meal handler

const saveCurrentMealHandler = async (event) => {
    event.preventDefault();
    console.log(event);

  const mealname = document.querySelector('#XXXXXX').value.trim();
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




//   document
//   .querySelector('.XXXXXXX')
//   .addEventListener('click', saveCurrentMealHandler);

