var nameTxt = $("#nameTxt");
var flavorTxt = $("#flavor-txt");

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

showSignUpBtn.on("click", function showSignUp(e) {
    e.preventDefault();
    flavorTxt.css("display", "none");
    logInInputs.css("display", "none");
    backBtn.css("display", "initial");
    signUpInputs.css("display", "initial");
    initialBtns.css("display", "none");
})

showLogInBtn.on("click", function showLogIn(e) {
    e.preventDefault();
    backBtn.css("display", "initial");
    flavorTxt.css("display", "none");
    logInInputs.css("display", "initial")
    signUpInputs.css("display", "none");
    initialBtns.css("display", "none");
})


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

logInBtn.on("click", function logIn(e) {
    e.preventDefault();
    background.css("display", "none");
    mainPage.css("display", "initial");
    leftWindow.css("display", "initial");
    rightWindow.css("display", "initial");
    dropDown.css("display", "initial");
    logo.css("display", "initial");
    landingLogo.css("display", "none");
})
