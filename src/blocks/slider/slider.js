(function(){
	$(function () {
		$('.slider').slick({
			prevArrow: $('.slider__prev'),
			nextArrow: $('.slider__next'),
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			dots: true
		});
	});
}());
