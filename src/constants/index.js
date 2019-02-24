const arabic = 'arabic';
const english = 'english';

export const RADIX = 10;
export const TAB_ONE = 0;
export const TAB_TWO = 1;
export const ADD_VEHICLE = 'ADD_VEHICLE'
export const ON_SOCIAL_MEDIA_AUTH = 'ON_SOCIAL_MEDIA_AUTH';
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
export const months = [
	{ value: 1, label: '01' },
	{ value: 2, label: '02' },
	{ value: 3, label: '03' },
	{ value: 4, label: '04' },
	{ value: 5, label: '05' },
	{ value: 6, label: '06' },
	{ value: 7, label: '07' },
	{ value: 8, label: '08' },
	{ value: 9, label: '09' },
	{ value: 10, label: '10' },
	{ value: 11, label: '11' },
	{ value: 12, label: '12' }
];

export const years = [
	{ value: 2019, label: '2019' },
	{ value: 2020, label: '2020' },
	{ value: 2021, label: '2021' },
	{ value: 2022, label: '2022' },
	{ value: 2023, label: '2023' },
	{ value: 2024, label: '2024' },
	{ value: 2025, label: '2025' },
	{ value: 2026, label: '2026' },
	{ value: 2027, label: '2027' },
	{ value: 2028, label: '2028' },
	{ value: 2029, label: '2029' },
];

export const CREDIT_CARD = 'Credit Card';
export const BANK_TRANSFER = 'Bank Transfer';

export const DECREMENT = 'decrement';
export const INCREMENT = 'increment';
export const quotations = 'quotations';
export const orders = 'orders';
export const helpCenter = 'helpCenter';
export const wishlist = 'wishlist';
export const garage = 'garage';
export const accountSetting = 'accountSetting';
export const addressBook = 'addressBook';
export const socialMedia = 'socialMedia';
export const payment = 'payment';
export const PENDING = 'pending';
export const REPLIED = 'replied';
export const rtl = 'rtl';
export const ltr = 'ltr';
