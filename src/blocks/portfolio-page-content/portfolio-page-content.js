(function(){
	$(function () {

		var portfolioImages = {
			children: [
				{img: 'img/children-1.jpg', thumb: 'img/children-1.jpg'},
				{img: 'img/children-2.jpg', thumb: 'img/children-2.jpg'},
				{img: 'img/children-3.jpg', thumb: 'img/children-3.jpg'},
				{img: 'img/children-4.jpeg', thumb: 'img/children-4.jpeg'},
				{img: 'img/children-6.jpg', thumb: 'img/children-6.jpg'},
				{img: 'img/children-7.jpg', thumb: 'img/children-7.jpg'},
				{img: 'img/children-8.jpg', thumb: 'img/children-8.jpg'},
				{img: 'img/children-9.jpg', thumb: 'img/children-9.jpg'},
				{img: 'img/children-10.jpg', thumb: 'img/children-10.jpg'}
			],
			promo: [
				{img: 'img/reklama-1.jpg', thumb: 'img/reklama-1.jpg'},
				{img: 'img/reklama-2.jpg', thumb: 'img/reklama-2.jpg'},
				{img: 'img/reklama-3.jpg', thumb: 'img/reklama-3.jpg'},
				{img: 'img/reklama-4.jpg', thumb: 'img/reklama-4.jpg'},
				{img: 'img/reklama-5.jpg', thumb: 'img/reklama-5.jpg'},
				{img: 'img/reklama-6.jpg', thumb: 'img/reklama-6.jpg'},
				{img: 'img/reklama-7.jpg', thumb: 'img/reklama-7.jpg'},
				{img: 'img/reklama-8.jpg', thumb: 'img/reklama-8.jpg'}
			]
		};


		var fotorama = $('#portfolio-fotorama').fotorama({
			nav: 'thumbs',
			maxheight: 612,
			fit: 'cover',
			data: portfolioImages.children
		});

		var fotoramaApi = fotorama.data('fotorama');
		var fotoramaLink =$('.portfolio-page-content__category-link');

		$(fotoramaLink).on('click', function (event) {
			event.preventDefault();
			var targetGroup = $(this).prop('hash').slice(1);
			$(fotoramaLink).removeClass('active');

			if(targetGroup) {
				fotoramaApi.load(portfolioImages[targetGroup]);
				$(this).addClass('active');
			} else {
				console.info('Для данной категории фотографии еще не загружены');
			}
		});
	});
}());
