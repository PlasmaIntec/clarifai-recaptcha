const Clarifai = require('clarifai');
const key = require('./config/config.js');

const app = new Clarifai.App({
	apiKey: key
});

app.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg')
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });