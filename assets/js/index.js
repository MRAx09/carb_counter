var nameTxt = $("#nameTxt");
var flavorTxt = $("#flavor-txt");

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

var backBtn = $("#backBtn")


showSignUpBtn.on("click", function signUp(e) {
    e.preventDefault();
    flavorTxt.css("display", "none");
    logInInputs.css("display", "none");
    backBtn.css("display", "initial");
    signUpInputs.css("display", "initial");
    initialBtns.css("display", "none");
})

showLogInBtn.on("click", function signUp(e) {
    e.preventDefault();
    backBtn.css("display", "initial");
    flavorTxt.css("display", "none");
    logInInputs.css("display", "initial")
    signUpInputs.css("display", "none");
    initialBtns.css("display", "none");
})


backBtn.on("click", function signUp(e) {
    e.preventDefault();
    flavorTxt.css("display", "initial");
    logInInputs.css("display", "none")
    signUpInputs.css("display", "none");
    initialBtns.css("display", "initial");
    backBtn.css("display", "none");

})