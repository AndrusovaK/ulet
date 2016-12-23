(function(){
	var fotoramaData = {
		emotionsBig: [
			{img: 'img/reklama-1.jpg', thumb: 'img/reklama-1.jpg'},
			{img: 'img/reklama-2.jpg', thumb: 'img/reklama-2.jpg'},
			{img: 'img/reklama-3.jpg', thumb: 'img/reklama-3.jpg'},
			{img: 'img/reklama-4.jpg', thumb: 'img/reklama-4.jpg'}
		],
		emotions1: [
			{img: 'img/children-1.jpg', thumb: 'img/children-1.jpg'},
			{img: 'img/children-2.jpg', thumb: 'img/children-2.jpg'},
			{img: 'img/children-3.jpg', thumb: 'img/children-3.jpg'},
			{img: 'img/children-4.jpeg', thumb: 'img/children-4.jpeg'}
		],
		emotions2: [
			{img: 'img/reklama-1.jpg', thumb: 'img/reklama-1.jpg'},
			{img: 'img/reklama-2.jpg', thumb: 'img/reklama-2.jpg'},
			{img: 'img/reklama-3.jpg', thumb: 'img/reklama-3.jpg'},
			{img: 'img/reklama-4.jpg', thumb: 'img/reklama-4.jpg'}
		]
	};

	$('#emotions-fotorama1').fotorama({
		nav: 'thumbs',
		maxheight: 270,
		fit: 'cover',
		data: fotoramaData.emotions1,
		thumbwidth: 120,
		thumbheight:80,
		thumbmargin: 15
	});

	$('#emotions-fotorama2').fotorama({
		nav: 'thumbs',
		maxheight: 270,
		fit: 'cover',
		data: fotoramaData.emotions2,
		thumbwidth: 120,
		thumbheight: 80,
		thumbmargin: 15
	});

	$('#emotions-fotorama-big').fotorama({
		nav: 'thumbs',
		maxheight: 460,
		fit: 'cover',
		data: fotoramaData.emotionsBig,
		thumbwidth: 120,
		thumbheight: 80,
		thumbmargin: 15
	});
}());
