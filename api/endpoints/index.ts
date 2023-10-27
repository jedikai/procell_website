import { quotationList } from './../../json/mock/quotationlist.mock';
export const baseUrl = process.env.NEXT_APP_BASE_URL;
export const baseUrlApi = `${process.env.NEXT_APP_BASE_URL}/`;
export const baseUrlMedia = process.env.NEXT_APP_BASE_URL;

// api doc => https://militarymoves-admin.dedicateddevelopers.us/apidoc

export const mediaUrl = (url: string) => {
  return `${baseUrlMedia}/uploads/${url}`;
};

export const endpoints = {
  auth: {
    signup: "user/existence",
    signUpProfile: "user/signup",
    login: "user/login",
    profileDetails: "user/profile/get",
    profileUpdate: "user/profile/update"
  },
  cms: {
    about: "aboutpolicy/details",
    faq: "faq/all"
  },
  app: {
    consumer_signup: "web/consumer/signup",
    practitioner_signup: "web/practitioner/invite",
    reset_password: "web/reset_passwd",
    user_login: "web/auth/login",
    country_list: "web/countries",
    state_list: "web/states",
    contact_us: "web/contactus",
    language:"web/contactus/lang",
    product_list:'web/products',
    product_details:'web/product',
    workshop_list:'web/workshop',
    clinical_study:'web/clinical_study',
    faq_list:'web/faqs',
    logout:'web/auth/logout',
    profile_details:'web/portal/profile',
    update_profile:'web/portal/profile',
    delete_profile:'web/portal/profile',
    quotation_list:'web/portal/quotes',
    sales_list:'web/portal/orders',
    purchase_list:'web/portal/purchases',
    cart_list:'web/cart',
    delete_item_from_cart:'web/cart/update',
    add_item_to_cart:'web/cart/update',
    update_cart_item_quantity:'web/cart/update',
    change_password:'web/portal/change_passwd',
  }
};

export const sucessNotificationEndPoints = [
  // endpoints.auth.signup,
  endpoints.auth.signUpProfile,
  endpoints.auth.login,
  endpoints.auth.profileUpdate
];
