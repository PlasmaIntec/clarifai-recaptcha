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
    console.error(err);
  });

var predictBase64 = (b) => {
	app.models.predict(Clarifai.GENERAL_MODEL, {base64: b})
		.then(response => {
	    var concepts = response['outputs'][0]['data']['concepts'];
			console.log(concepts);
		})
		.catch(err => {
			console.error(err);
		});
}	

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

	getBase64(file)
		.then(b => {
			predictBase64(b);
		});
});

var getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });
};