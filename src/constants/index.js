const arabic = 'arabic';
const english = 'english';
const BANK_TRANSFER_AR = 'التحويل المصرفي';

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
export { styles, colors, helpers, sliderSetting, starsRating, swiperParams, swiperBrandParams } from './styles';
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

export const paymentMethod = {
	name: BANK_TRANSFER,
	nameAr: BANK_TRANSFER_AR
}

export const getCategoryId = (translate) => (
	new Map([
		[1, translate("nav.oilFilter")],
		[2, translate("nav.oilFilter")],
		[3, translate("nav.airFilter")],
		[4, translate("nav.acFilter")],
		[5, translate("nav.sparkPlugs")],
		[6, translate("nav.brakePads")],
		[7, translate("nav.motorOil")],
		[8, translate("nav.gearOil")],
		[9, translate("nav.oil")],
		[10, translate("navBar.accessories")],
		[11, translate("nav.carAccessorise")],
		[12, translate("nav.wiresAndCables")],
		[13, translate("nav.tires")],
		[14, translate("nav.carRefrigerator")],
		[15, translate("nav.childSeat")],
		[16, translate("nav.bodyworkCleaningAndCare")],
		[17, translate("nav.carMats")],
		[18, translate("nav.Covers")],
		[19, translate("nav.carFirstAidKit")],
		[20, translate("nav.exteriorAccessorise")],
		[21, translate("nav.InternalLights")],
		[22, translate("nav.toolKits")],
		[23, translate("nav.sunCurtains")],
		[24, translate("nav.carSunShade")],
		[25, translate("nav.towingTools")],
		[26, translate("nav.carCare")],
		[27, translate("nav.coolant")],
		[28, translate("nav.tools")],
		[29, translate("nav.handTools")],
		[30, translate("nav.electricalTools")],
		[31, translate("nav.tyreInflator")],
		[33, translate("nav.repairEquipment")],
		[34, translate("nav.motorCareLiquids")],
		[35, translate("nav.washCleanersAndPolishers")],
		[36, translate("nav.sportsAndOutdoors")],
		[37, translate("nav.spareParts")],
		[38, translate("nav.batteries")],
	])
)

export const paymentStatus = {
	paid: 'paid',
	failed: 'failed',
}
