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
    language: "web/contactus/lang",
    product_list: "web/products",
    product_details: "web/product",
    workshop_list: "web/workshop",
    clinical_study: "web/clinical_study",
    faq_list: "web/faqs",
    story_section_data: "web/homepage_details",
    treatment_video_data: "web/video_urls",
    get_help_reason: "web/get_help_reason",
    get_help_submit: "web/get_help_submit",
    get_help_ceo_submit: "web/get_help_ceo_submit",
    logout: "web/auth/logout",
    profile_details: "web/portal/profile",
    update_profile: "web/portal/profile",
    delete_profile: "web/portal/profile",
    quotation_list: "web/portal/quotes",
    sales_list: "web/portal/orders",
    invoice_list: "web/portal/invoices",
    download_invoice: "web/download/invoice_pdf",
    purchase_list: "web/portal/purchases",
    cart_list: "web/cart",
    delete_item_from_cart: "web/cart/update",
    add_item_to_cart: "web/cart/update",
    update_cart_item_quantity: "web/cart/update",
    change_password: "web/portal/change_passwd",
    delivery_method_list: "web/delivery_methods",
    shipment_rate: "web/carrier_rate_shipment",
    update_shipping_mode: "web/update_carrier",
    checkout_address_list: "web/address",
    edit_address: "web/address",
    create_address: "web/address",
    address_save: "web/address",
    get_card_list: "web/payment_method",
    get_payment_cred_and_data: "web/payment",
    card_polling: "web/payment/status/poll",
    update_shipping: "web/update/shipping",
    order_confirm: "web/confirmation",
    pament_validate: "/web/payment/validate",
    payment_transaction: "web/payment/transaction",
    card_delete: "web/payment/archive_token",
    authorize_payment: "web/payment/authorize/payment",
    create_session_id:
      "web/session/create",
    blog_list:
      "https://dev.wordpress-developer.us/procell-ui/wp-json/wp/v2/posts/",
    categories_list:
      "https://dev.wordpress-developer.us/procell-ui/wp-json/wp/v2/categories",
    blog_details:
      "https://dev.wordpress-developer.us/procell-ui/wp-json/custom-api/blog-posts-details",
    related_post:
      "https://dev.wordpress-developer.us/procell-ui/wp-json/custom-api/related-post",
    science_categories_list:
      "https://dev.wordpress-developer.us/procell-ui/wp-json/wp/v2/new-topics",
    science_blog_list:
      "https://dev.wordpress-developer.us/procell-ui/wp-json/wp/v2/the-sciences",
    science_blog_list_search_wise:
      "https://dev.wordpress-developer.us/procell-ui/wp-json/custom-api/",
    science_popular_post_list:
      "https://dev.wordpress-developer.us/procell-ui/wp-json/custom-api/popular-post",
    blog_count:
      "https://dev.wordpress-developer.us/procell-ui/wp-json/custom-api/",
    science_blog_details:
      "https://dev.wordpress-developer.us/procell-ui/wp-json/custom-api/",
    authorizeNet:
      // "https://api.authorize.net/xml/v1/request.api"
      "https://apitest.authorize.net/xml/v1/request.api"
  }
};

export const sucessNotificationEndPoints = [
  // endpoints.auth.signup,
  endpoints.auth.signUpProfile,
  endpoints.auth.login,
  endpoints.auth.profileUpdate
];
