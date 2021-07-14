// Much of this is from Beau's prototpe (from the index.js file in his prototype)
var nameTxt = $("#nameTxt");
var flavorTxt = $("#flavor-txt");

var deleteBtn = $(".deleteBtn");
var addFavButton = $(".addFavButton")

var background = $("#background")
var initialBtns = $("#initialBtns")
var signUpInputs = $("#signUpInputs")
var logInInputs = $("#logInInputs")

var showLogInBtn = $("#showLogInBtn");
var showSignUpBtn = $("#showSignUpBtn");

var logInBtn = $("#logInBtn");
var signUpBtn = $("#signUpBtn");

var newUserName = $("#newUserName");
var createUserNameInput = $("#createUserNameInput");
var newUserPw = $("#newUserPw");
var createUserPasswordInput = $("#createUserPasswordInput");
var confirmPw = $("#confirmPw");
var createAcntBtn = $("#createAcntBtn");

var logInUserName = $("#logInUserName");
var userNameInput = $("#userNameInput");
var logInPassword = $("#logInPassword");
var passwordInput = $("#passwordInput");

var mainPage = $("#mainPage");
var backBtn = $("#backBtn");
var logo = $("#logo");
var leftWindow = $("#leftWindow");
var rightWindow = $("#rightWindow");
var landingLogo = $("#landingLogo");
var dropDown = $("#dropDown");

var mealName = $("#mealName")
var searchDiv = $("#searchDiv")

var favorites = $("#favorites")
let table = $(".table");

var loggedInDisplay = $("#loggedInDisplay")

// // delete row item function
// deleteBtn.click(function () {
//     $(this).closest('tr').addClass('selected');
//     $('tr.selected').remove();
// });

addFavButton.click(function () {
    // let row = $(this).closest('tr')
    // console.log(row)
    // row.appendTo(favorites)
    // need to exclude buttons and include formatting
    $(".add-row").click(function () {
        markup = "<tr><td>This is row "
            + lineNo + "</td></tr>";
        tableBody = $("table tbody");
        tableBody.append(markup);
        lineNo++;
    });
});

showSignUpBtn.on("click", function showSignUp(e) {
    e.preventDefault();
    flavorTxt.css("display", "none");
    logInInputs.css("display", "none");
    backBtn.css("display", "initial");
    signUpInputs.css("display", "initial");
    initialBtns.css("display", "none");
})

// showLogInBtn.on("click", function showLogIn(e) {
//     e.preventDefault();
    backBtn.css("display", "initial");
    flavorTxt.css("display", "none");
    logInInputs.css("display", "initial")
    signUpInputs.css("display", "none");
    initialBtns.css("display", "none");
// })


backBtn.on("click", function back(e) {
    e.preventDefault();
    flavorTxt.css("display", "initial");
    logInInputs.css("display", "none")
    signUpInputs.css("display", "none");
    initialBtns.css("display", "initial");
    backBtn.css("display", "none");

})

var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
    return new bootstrap.Dropdown(dropdownToggleEl)
})

background.css("display", "none");
mainPage.css("display", "initial");
leftWindow.css("display", "initial");
rightWindow.css("display", "initial");
dropDown.css("display", "initial");
logo.css("display", "initial");
landingLogo.css("display", "none");
searchDiv.css("display", "initial")
mealName.css("display", "initial");
loggedInDisplay.css("display", "initial");


deleteBtn.click(async function () {
    if (this.hasAttribute('foodDelBtn-id')) {
      const id = this.getAttribute('foodDelBtn-id');
        console.log('IDDDDDDDDDDDDDDDDDD');
        console.log(id);
      const response = await fetch(`/api/foods/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // document.location.replace('/api/meals/savedmeals');
        alert('Favorite deleted');
        $(this).closest('tr').addClass('selected');
        $('tr.selected').remove();
      } else {
        alert('Failed to delete favorite');
      }
    }

  });
// ***** Don't think this commented out section is needed.
// ***** Remove it. This is taken care of by the the inital GET '/' route. 
// const mealsTabHandler = async (event) => {
//     const response = await fetch('/api/meals/savedmeals', { 
//       method: 'GET',
//     });
//     console.log('iuiuiuiuiuiuiuiu');
//     console.log(response);
//     if (response.ok) {
//       // document.location.replace('/api/meals/savedmeals');
//     } else {
//       alert('Failed to list meals');
//     }
//   };
// document.querySelector('#meals-tab').addEventListener('click', mealsTabHandler);

// const favoritesTabHandler = async (event) => {
//   const response = await fetch('/favorites', { 
//     method: 'GET',
//   });
//   console.log('opopopopopopop');
//   console.log(response);
//   if (response.ok) {
//     // document.location.replace('/api/meals/savedmeals');
//   } else {
//     alert('Failed to list favorite foods');
//   }
// };
// document.querySelector('#favorites-tab').addEventListener('click', favoritesTabHandler);

// ***** Don't think this commented out section is needed.
// ***** Remove it. This is taken care of by the the inital GET '/' route. 
// const delFoodHandler = async (event) => {
//     console.log('jjjjjjjjjjjjjjjjjjj');
//     if (event.target.hasAttribute('foodDelBtn-id')) {
//       const id = event.target.getAttribute('foodDelBtn-id');
//         console.log('IDDDDDDDDDDDDDDDDDD');
//         console.log(id);
//       const response = await fetch(`/api/foods/${id}`, { //****??? */
//         method: 'DELETE',
//       });
  
//       if (response.ok) {
//         // document.location.replace('/api/meals/savedmeals');
//         alert('Favorite deleted');

//       } else {
//         alert('Failed to delete favorite');
//       }
//     }
//   };  
//   document
//     .querySelector('.deleteBtn')
//     .addEventListener('click', delFoodHandler);

    // delete row item function
// deleteBtn.click(function () {
//     $(this).closest('tr').addClass('selected');
//     $('tr.selected').remove();
// });


//Code to total carbohydrates in current meal
var cls = document.getElementById("curMealTable").getElementsByTagName("td");
if (cls) {
  var sum = 0;
  for (var i = 0; i < cls.length; i++){
      if(cls[i].className == "carbRow"){
        var carbColString = cls[i].innerHTML;
        sum += Number(carbColString.substring(0, carbColString.indexOf("g")));
      };
  }
  var tableBody = document.getElementById("currentMealTableBody");
  var text = document.createTextNode(` Total carbs: ${sum}`);
  tableBody.appendChild(text);
};
