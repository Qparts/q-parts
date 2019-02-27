import App from '../components/App';
import Cart from '../components/cart/Cart';
import VendorForm from '../components/VendorForm/VendorForm'
import Login from '../containers/Authentication/Login/Login';
import Signup from '../containers/Authentication/Signup/Signup'
import Logout from '../containers/Logout/Logout';
import Setting from '../containers/Setting/Setting'
import QuotationRequest from '../components/QuotationRequest/QuotationRequest';
import VerifyEmail from '../components/VerifyEmail/VerifyEmail';
import Checkout from '../components/Checkout/Checkout';
import ProductDetail from '../containers/Product/ProductDetail';
import Accessories from '../components/Accessories/Accessories';
import Tyres from '../components/Tyres/Tyres';
import MotorOil from '../components/MotorOil/MotorOil';
import Vehicles from '../components/Vehicles/Vehicles';
import SendRequest from '../components/SendRequest/SendRequest';
import SearchResult from '../containers/SearchResult/SearchResult'
import ForgotPassword from '../containers/Authentication/ForgotPassword/ForgotPassword';
import ConfirmSignUp from '../containers/Authentication/ForgotPassword/ConfirmSignUp/ConfirmSignUp';
import CheckoutConfirmationOrder from '../components/CheckoutConfirmationOrder/CheckoutConfirmationOrder';

export const routes = (isAuth, direction, defaultLang, translate) => [
    {
        path: "/",
        exact: true,
        component: App,
    },
    {
        path: "/quotation-order",
        exact: true,
        component: QuotationRequest,
        defaultLang
    },
    {
        path: "/quotation-order/confirmation:quotationId?",
        component: SendRequest,
        direction: direction,
        isAuth: isAuth,
        redirectTo: '/'
    },
    {
        path: "/login",
        component: Login,
        isAuth: !isAuth,
        redirectTo: '/'
    },
    {
        path: "/logout",
        component: Logout
    },
    {
        path: "/signup",
        component: Signup,
        isAuth: !isAuth,
        redirectTo: '/',
        exact: true,
    },
    {
        path: "/signup/successful",
        component: ConfirmSignUp,
        exact: true,
    },
    {
        path: "/vehicles",
        component: Vehicles,
        defaultLang
    },
    {
        path: "/cart",
        component: Cart,
        direction: direction
    },
    {
        path: "/setting",
        component: Setting,
        isAuth: isAuth,
        redirectTo: '/'
    },
    {
        path: "/vendor_registration_form",
        component: VendorForm,
    },
    {
        path: "/activate-email/:code?/:email?",
        exact: true,
        component: VerifyEmail,
        direction: direction,
    },
    {
        path: "/password/reset-password/:code?/:email?",
        exact: true,
        component: VerifyEmail,
    },
    {
        path: "/checkout",
        component: Checkout,
        isAuth: isAuth,
        redirectTo: '/login'
    },
    {
        path: "/products/:productId",
        component: ProductDetail
    },
    {
        path: "/accessories",
        component: Accessories
    },
    {
        path: "/tyres",
        component: Tyres
    },
    {
        path: "/motor-oil",
        component: MotorOil
    },
    {
        path: "/listing",
        component: SearchResult
    },
    {
        path: "/password/forgot-password",
        exact: true,
        component: ForgotPassword,
        translate
    },
    {
        path: "/payment-response:cartId?/:id?/:status?/:message?",
        exact: true,
        component: CheckoutConfirmationOrder,
        translate,
        direction
    },
];
