const arabic = 'arabic';
const english = 'english';

export const RADIX = 10;
export const TAB_ONE = 0;
export const TAB_TWO = 1;
export const ADD_VEHICLE = 'ADD_VEHICLE'
export const ON_SOCIAL_MEDIA_LOGIN = 'ON_SOCIAL_MEDIA_LOGIN';
export const ON_SOCIAL_MEDIA_SIGNUP = 'ON_SOCIAL_MEDIA_SIGNUP';
export const ON_SOCIAL_MEDIA_LINK = 'ON_SOCIAL_MEDIA_LINK';
export const CONNECT = 'connect';
export const DISCONNECT = 'disconnect';
export const AR = 'ar';
export const EN = 'en';
export const LANGUAGES = [
	{ value: AR, label: arabic },
	{ value: EN, label: english }
];
export const LOCAL_LANGUAGES = [
	{ name: arabic, code: AR },
	{ name: english, code: EN }
];
export const serverErrorField = {
	email: 'email',
	newPassword: 'newPassword',
	password: 'password'
}
export const BEST_SELLER = 'Best Seller';
export const OFFERS = 'Offers';
export const RECENT_VIEWED = 'Recent Viewed';
export { styles, colors, helpers, sliderSetting, starsRating } from './styles';
export const categorySortOptions = [
	{ value: 'recommended', label: 'Recommended' },
	{ value: 'lPrice', label: 'Lowest price' },
	{ value: 'hPrice', label: 'Highest price' },
	{ value: 'rating', label: 'Rating' }
];