const nutritionix   = require("nutritionix-api");

const YOUR_APP_ID   = '6d49b16d'; // Your APP ID
const YOUR_API_KEY  = 'c3f9948827ec66b95e92858e23b748e4'; // Your KEY

nutritionix.init(YOUR_APP_ID,YOUR_API_KEY);

nutritionix.natural.search('2 large eggs').then(result => {
    console.log(result);
});