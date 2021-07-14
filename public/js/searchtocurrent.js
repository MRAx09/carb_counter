
function putSearchedIdinLocalStorage () {

const searchedFoodId = document.getElementById("searched-food-id").innerHTML
console.log('serachedFoodId:     ', searchedFoodId)



const stringId = JSON.stringify(searchedFoodId)
        console.log('stringID:     ', stringId)

        var currentStored;

        if (localStorage.getItem("currentMealFoods") === null) {
            currentStored = [];
        }
        else {
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
    putSearchedIdinLocalStorage();


