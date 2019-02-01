const Clarifai = require('clarifai');
const key = require('./config/config.js');

const app = new Clarifai.App({
	apiKey: key
});

var predictBase64 = (b) => {
	return app.models.predict(Clarifai.GENERAL_MODEL, {base64: b})
		.then(response => {
	    var concepts = response['outputs'][0]['data']['concepts'];
			// console.log(concepts);
			return concepts;
		})
		.catch(err => console.error(err))
};

var processData = (data) => {
	// console.log('data', data);
	return data.reduce((acc, cur) => {
		if (cur.value > .9) acc.push(cur);
		return acc;
	}, []);
};

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
  })
  	.then(str => predictBase64(str))
  	.then(data => processData(data))
  	.catch(err => console.error(err))
};

module.exports = {
	getBase64: getBase64
};