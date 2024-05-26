import { createCookie } from "@remix-run/node";
import { json } from "@remix-run/node";

const prefs = createCookie("prefs");

// read the state from the cookie
async function LoadCookiesData (request, keys) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};
  let obj = {}
  keys.forEach(ele => {
    Object.assign(obj, { [ele] : cookie[ele] })
  });
  return obj;
}

// write the state to the cookie
async function StoreCookiesData (request, keys) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};
  const formData = await request.formData();

  keys.forEach(ele => {
    const receivedData = formData.get(ele)
    cookie[ele] = receivedData;
  });

  return json(keys, {
    headers: {"Set-Cookie": await prefs.serialize(cookie),},
  });
}

export {
  LoadCookiesData,
  StoreCookiesData
}
