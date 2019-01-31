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

$file = $('<input>').attr('type', 'file');
$file.text('pick file');
$('body').append($file);

$file.on('change', (event) => {
	var file = event.target.files[0];
	var reader = new FileReader();

	reader.onload = () => {
		var src = reader.result;
		$img = $('<img>').attr('src', src);
		$img.css({height: '500px', width: '500px'});
		$('body').append($img);
	}

	reader.readAsDataURL(file);
});