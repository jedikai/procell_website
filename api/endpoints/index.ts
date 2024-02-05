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
    contact_rep: "web/get_salesperson",
    clinical_study: "web/clinical_study",
    faq_list: "web/faqs",
    my_order_list: "web/portal/orders/page",
    story_section_data: "web/homepage_details",
    treatment_video_data: "web/video_urls",
    image_comparision_data: "web/img_comparison",
    testimonial_data: "web/testimonial_urls",
    get_help_reason: "web/get_help_reason",
    get_clients_list: "web/practitioner-customer/get",
    get_clients_details: "web/practitioner-customer/get-customer",
    get_client_entries: "web/practitioner-customer/get_entries",
    get_client_entry_details: "web/practitioner-customer/get_entry",
    delete_entry_image: "web/practitioner-customer/delete_image",
    delete_entry: "web/practitioner-customer/delete_entry",
    create_entry: "web/practitioner-customer/create_entry",
    create_client: "web/practitioner-customer/create",
    update_client: "web/practitioner-customer/update",
    update_entry: "web/practitioner-customer/update_entry",
    delete_client: "web/practitioner-customer/delete",
    add_entry_image: "web/practitioner-customer/add_images",
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
    get_manage_communication_data: "web/mail/opt_out",
    cart_list: "web/cart",
    certificate_list: "web/get_certificate",
    user_trac_with_cartlist_count: "web/cart_quantity",
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
    delete_address: "web/address/delete",
    address_save: "web/address",
    get_card_list: "web/payment_method",
    get_academy_info: "web/academy_info",
    get_practitioner_academy_content: "web/practitioner-academy/content",
    complete_practitioner_content: "web/practitioner-academy/content-complete",
    complete_rep_content: "web/rep-academy/content-complete",
    get_rep_academy_content: "web/rep-academy/content",
    get_recources_prac: "web/practitioner-academy/resource_categories",
    get_recources_prac_cat: "web/practitioner-academy/resources",
    get_recources_rep: "web/rep-academy/resource_categories",
    get_recources_rep_cat: "web/rep-academy/resources",
    get_payment_cred_and_data: "web/payment",
    card_polling: "web/payment/status/poll",
    update_shipping: "web/update/shipping",
    order_confirm: "web/confirmation",
    pament_validate: "/web/payment/validate",
    payment_transaction: "web/payment/transaction",
    card_delete: "web/payment/archive_token",
    authorize_payment: "web/payment/authorize/payment",
    create_session_id: "web/session/create",
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
