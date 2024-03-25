// import {
//   decryptData, encryptData,
//   // encryptData
// } from "./_crypto.lib";

import { setCookie } from "nookies";
import { checkWindow, isInServer } from "./_helpers.lib";

/**
 * It takes a key and a value, encrypts the value, and saves it in local storage
 * @param key - The key to store the data under.
 * @param value - The value to be encrypted.
 */
export function saveInLocalStorage(key: string, value: string) {
  if (checkWindow()) {
    // let encript_key = encryptData(key);
    // const encriptVal = encryptData(value);

    localStorage.setItem(key, value);
  }
}

/**
 * It gets the data from the local storage, decrypts it, and returns it
 * @param key - The key to store the data in local storage.
 * @returns the decrypted data from the local storage.
 */
export function getFromLocalStorage(key: string) {
  if (checkWindow()) {
    const getItem = localStorage.getItem(key);

    if (getItem?.length) {
      return getItem;
    }

    return null;
  }

  return null;
}

/**
 * It checks if the browser allows cookies
 */
export function isCookieAllowed() {
  if (typeof navigator !== "undefined" && !isInServer()) {
    let { cookieEnabled } = navigator;
    if (!cookieEnabled) {
      //check again if we can write cookie still
      document.cookie = "testcookie";
      cookieEnabled = document.cookie.indexOf("testcookie") !== -1;
    }
    return cookieEnabled;
  }
  //on server return always true
  return true;
}

/**
 * It returns the value of the cookie with the name cname
 * @param cname - The name of the cookie you want to get.
 * @returns A function that returns a cookie value.
 */
export function getCookie(cname: string) {
  if (!isInServer()) {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  //if it runs in server return null, by default next-cookie-wrapper wraps in redux
  //or get cookies in methods getInitialProps etc
  return null;
}

export function setCookieClient(key: string, value: string) {
  setCookie(null, key, value, {
    path: "/",
  });
}

export function setCookieClientForGuest(key: string, value: string) {
  const expires = new Date();
  // Set the expiration date to one year from now
  expires.setFullYear(expires.getFullYear() + 1);
  
  setCookie(null, key, value, {
    path: "/",
    expires, // Set the expiration date
    // You may also need to set other options depending on your requirements
    // For example, you might want to set 'secure: true' if your site is served over HTTPS
    // secure: true
  });
}


export { checkWindow };
