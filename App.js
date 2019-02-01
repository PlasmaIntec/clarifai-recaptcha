const agent = require('./ClarifaiAPI.js');

$input = $('<div>').addClass('input');
$output = $('<div>').addClass('output');
$img = $('<img>').addClass('image');
$file = $('<input>').attr('type', 'file');
$('body').append($input);
$('body').append($output);
$input.append($img);
$input.append($file);

$file.on('change', (event) => {
	var file = event.target.files[0];
	var reader = new FileReader();

	reader.onload = () => {
		$img.attr('src', reader.result);
	}

	reader.readAsDataURL(file);

	agent.getBase64(file)
		.then(data => {
			console.log('data', data);
			$output.empty();
			data.forEach(info => tag(info));
		});
});

var tag = (obj) => {
	var newTag = $('<div>').addClass('tag');
	newTag.text(`${obj.name}: ${obj.value}`);
	$output.append(newTag);
};