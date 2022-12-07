import { AES, enc, mode, pad } from "crypto-js";
export function encrypt(
  word: string | Object,
  keyStr: string = import.meta.env.VITE_CODE_KEY
) {
  if (word instanceof Object) {
    word = JSON.stringify(word);
  }
  var key = enc.Utf8.parse(keyStr);
  var encryptedObj = AES.encrypt(enc.Utf8.parse(word as string), key, {
    mode: mode.ECB,
    padding: pad.Pkcs7,
  });
  return encryptedObj.toString();
}
// 解密函數
export function decrypt(
  word: string,
  keyStr: string = import.meta.env.VITE_CODE_KEY
) {
  let key = enc.Utf8.parse(keyStr);
  let decrypt = AES.decrypt(word, key, {
    mode: mode.ECB,
    padding: pad.ZeroPadding,
  });
  let decString = enc.Utf8.stringify(decrypt).toString();
  console.log("decString", decString);
  return decString;
}
