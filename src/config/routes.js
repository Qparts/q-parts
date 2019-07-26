import App from '../components/App';
import Cart from '../components/cart/Cart';
import VendorForm from '../components/VendorForm/VendorForm';
import Login from '../containers/Authentication/Login/Login';
import Signup from '../containers/Authentication/Signup/Signup';
import Logout from '../containers/Logout/Logout';
import Setting from '../containers/Setting/Setting';
import QuotationRequest from '../components/QuotationRequest/QuotationRequest';
import VerifyEmail from '../components/VerifyEmail/VerifyEmail';
import Checkout from '../components/Checkout/Checkout';
import ProductDetail from '../containers/Product/ProductDetail';
import AddProduct from '../containers/Product/AddProductPopup/AddProduct';
import Accessories from '../components/Accessories/Accessories';
import MotorOil from '../components/MotorOil/MotorOil';
import Tires from '../components/Tires/Tires';
import Vehicles from '../components/Vehicles/Vehicles';
import SendRequest from '../components/SendRequest/SendRequest';
import SearchResult from '../containers/SearchResult/SearchResult';
import ForgotPassword from '../containers/Authentication/ForgotPassword/ForgotPassword';
import ConfirmSignUp from '../containers/Authentication/ForgotPassword/ConfirmSignUp/ConfirmSignUp';
import CheckoutConfirmationOrder from '../components/CheckoutConfirmationOrder/CheckoutConfirmationOrder';
import TermsAndConditions from '../components/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from '../components/TermsAndConditions/PrivacyPolicy';
import ReturnPolicy from '../components/TermsAndConditions/ReturnPolicy';
import ShippingAndDeliveryPolicy from '../components/TermsAndConditions/ShippingAndDeliveryPolicy';
import QuotationPaymentResponse from '../components/QuotationPaymentResponse/QuotationPaymentResponse';

export const routes = (isAuth, direction, defaultLang, translate) => [
	{
		path: '/',
		exact: true,
		component: App
	},
	{
		path: '/quotation-order',
		exact: true,
		component: QuotationRequest,
		defaultLang
	},
	{
		path: '/quotation-order/confirmation:quotationId?',
		component: SendRequest,
		direction: direction,
		isAuth: isAuth,
		redirectTo: '/'
	},
	{
		path: '/login',
		component: Login,
		isAuth: !isAuth,
		redirectTo: '/'
	},
	{
		path: '/logout',
		component: Logout
	},
	{
		path: '/signup',
		component: Signup,
		isAuth: !isAuth,
		redirectTo: '/',
		exact: true
	},
	{
		path: '/signup/successful',
		component: ConfirmSignUp,
		isAuth: isAuth,
		direction: direction,
		translate,
		redirectTo: '/',
		exact: true
	},
	{
		path: '/vehicles',
		component: Vehicles,
		defaultLang
	},
	{
		path: '/cart',
		component: Cart,
		direction: direction
	},
	{
		path: '/setting',
		component: Setting,
		defaultLang
	},
	{
		path: '/vendor_registration_form',
		component: VendorForm
	},
	{
		path: '/activate-email/:code?/:email?',
		exact: true,
		component: VerifyEmail,
		direction: direction
	},
	{
		path: '/password/reset-password/:code?/:email?',
		exact: true,
		component: VerifyEmail
	},
	{
		path: '/checkout',
		component: Checkout,
		isAuth: isAuth,
		redirectTo: '/loginCheckout'
	},
	{
		path: '/products/:productId',
		component: ProductDetail,
		exact: true
	},
	{
		path: '/addProduct',
		component: AddProduct,
		token: isAuth,
		direction,
		translate,
		currentLanguage: defaultLang,
		data: {}
	},
	// {
	//     path: "/accessories",
	//     component: Accessories
	// },
	{
		path: '/tires',
		component: Tires,
		direction,
		translate
	},
	// {
	//     path: "/motor-oil",
	//     component: MotorOil,
	//     currentLanguage: defaultLang
	// },
	{
		path: '/listing',
		component: SearchResult
	},
	{
		path: '/password/forgot-password',
		exact: true,
		component: ForgotPassword,
		translate
	},
	{
		path: '/payment-response:cartId?/:id?/:status?/:message?',
		exact: true,
		component: CheckoutConfirmationOrder,
		translate,
		direction,
		defaultLang
	},
	{
		path: '/quotation-payment-response:quotationId?/:paymentStatus?',
		component: QuotationPaymentResponse,
		direction: direction,
		isAuth: isAuth,
		redirectTo: '/'
	},
	{
		path: '/privacy',
		component: TermsAndConditions
	},
	{
		path: '/privacyPolicy',
		component: PrivacyPolicy
	},
	{
		path: '/returnPolicy',
		component: ReturnPolicy
	},
	{
		path: '/shippingAndDeliveryPolicy',
		component: ShippingAndDeliveryPolicy
	},
	{
		path: '/loginCheckout',
		component: Login,
		isAuth: !isAuth,
		redirectTo: '/checkout'
	}
];
