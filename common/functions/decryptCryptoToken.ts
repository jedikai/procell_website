import CryptoJS from "crypto-js";

export const decryptData = (encryptedData: string, key: string) => {
  // Decode the base64-encoded data
  const combinedData = CryptoJS.enc.Base64.parse(encryptedData);

  // Extract the IV and encrypted data
  const iv = combinedData.words.slice(0, 4);
  const encryptedValue = combinedData.words.slice(4);

  // Convert the key from hex to WordArray
  const cryptoKey = CryptoJS.enc.Hex.parse(key);

  // Create a decryption configuration
  const decryptionConfig = {
    iv: CryptoJS.lib.WordArray.create(iv),
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.Pkcs7 // Use PKCS7 padding
  };

  const config = {
    ciphertext: CryptoJS.lib.WordArray.create(encryptedValue),
    iv: CryptoJS.lib.WordArray.create(iv),
    mode: CryptoJS.mode.CFB as any,
    padding: CryptoJS.pad.Pkcs7,
    salt: CryptoJS.lib.WordArray.create(iv)
  };

  // Decrypt the data
  const decryptedBytes = CryptoJS.AES.decrypt(
    config as CryptoJS.lib.CipherParams,
    cryptoKey,
    decryptionConfig
  );

  // Convert the decrypted data to a string
  const decryptedValue = CryptoJS.enc.Utf8.stringify(decryptedBytes);

  return decryptedValue;
};
