import $ from 'jquery';

const MqL = 1170;

export const closeNav = () => {
	$('.cd-nav-trigger').removeClass('nav-is-visible');
	$('.cd-main-header').removeClass('nav-is-visible');
	$('.cd-primary-nav').removeClass('nav-is-visible');
	$('.has-children ul').addClass('is-hidden');
	$('.has-children a').removeClass('selected');
	$('.moves-out').removeClass('moves-out');
	$('.cd-overlay').removeClass('is-visible');
	$('.cd-main-content')
		.removeClass('nav-is-visible')
		.one(
			'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
			function() {
				$('html').removeClass('overflow-hidden');
			}
		);
};

export const toggleSearch = type => {
	if (type === 'close') {
		//close serach
		$('.cd-search').removeClass('is-visible');
		$('.cd-search-trigger').removeClass('search-is-visible');
		$('.cd-overlay').removeClass('search-is-visible');
		$('html').removeClass('overflow-hidden-search');
		$('.cd-overlay').removeClass('is-visible');
	} else {
		//toggle search visibility
		$('.cd-search').toggleClass('is-visible');
		$('.cd-search-trigger').toggleClass('search-is-visible');
		$('.cd-overlay').toggleClass('search-is-visible');
		$('html').toggleClass('overflow-hidden-search');
		if ($(window).width() > MqL && $('.cd-search').hasClass('is-visible'))
			$('.cd-search')
				.find('input[type="search"]')
				.focus();
		$('.cd-search').hasClass('is-visible')
			? $('.cd-overlay').addClass('is-visible')
			: $('.cd-overlay').removeClass('is-visible');
	}
};

export const goBack = history => {
	history.goBack();
};
