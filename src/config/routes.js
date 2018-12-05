import App from '../components/App';
import Cart from '../components/cart/Cart';
import VendorForm from '../components/VendorForm/VendorForm'
import SearchResult from '../containers/ManualForm/SearchResult/SearchResult';
import Catalog from '../containers/Catalog/Catalog';
import Login from '../containers/Authentication/Login/Login';
import Signup from '../containers/Authentication/Signup/Signup'
import Logout from '../containers/Logout/Logout';
import Setting from '../containers/Setting/Setting'
import QuotationRequest from '../components/QuotationRequest/QuotationRequest';
import VerifyEmail from '../components/VerifyEmail/VerifyEmail';
import Checkout from '../components/Checkout/Checkout';
import Product from '../containers/Product/Product';
import Accessories from '../components/Accessories/Accessories';
import Tyres from '../components/Tyres/Tyres';
import MotorOil from '../components/MotorOil/MotorOil';
import Vehicles from '../components/Vehicles/Vehicles';
import SendRequest from '../components/SendRequest/SendRequest';


export const routes = (isAuth) => [
 {
  path: "/",
  exact: true,
  component: App,
 },
 {
  path: "/order/part/:partNo/makeId/:makeId",
  component: SearchResult,
 },
 {
  path: "/order/quotation-request",
  component: QuotationRequest,
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
  redirectTo: '/'
 },
 {
  path: "/vehicles",
  component: Vehicles,
 },
 {
  path: "/catalog",
  component: Catalog
 },
 {
  path: "/cart",
  component: Cart
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
  path: "/qtest.fareed9.com/change-email/",
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
  component: Product
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
  path: "/send",
  component: SendRequest
 }
];