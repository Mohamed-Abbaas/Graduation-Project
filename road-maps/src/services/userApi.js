import axios from "axios";
import Cookies from "js-cookie";
import { ReactReduxContext } from "react-redux";
const token = Cookies.get("jwt");
const headers = {
  Authorization: `Bearer ${token}`,
};
const ApiURL = "https://knowledge-sharing-1.onrender.com/api";
export async function createUser({ user }) {
  try {
    const res = await axios.post(
      `https://knowledge-sharing-1.onrender.com/api/v1/users/signup`,
      user
    );
    if (!res.ok) throw new Error("Error happened while posting data");
    const { returnoly } = await res.json();
    return returnoly;
  } catch {
    throw new Error("Error happened while posting data");
  }
}
// {{URL}}api/v1/users//verify-email/4800
export async function verify(code) {
  const res = await axios.post(`${ApiURL}/v1/users//verify-email/${code}`);
}
export async function getUser(id) {
  const res = await fetch(
    `https://knowledge-sharing-1.onrender.com/api/v1/users/${id}`,
    { headers: headers, method: "GET" }
  );
  return res;
}
export async function getUsers() {
  const res = await axios.get(
    `https://knowledge-sharing-1.onrender.com/api/v1/users`,
    { headers }
  );
  return res;
}
export async function unVerified() {
  const res = await axios.get(
    `https://knowledge-sharing-1.onrender.com/api/v1/users/allUsers`,
    { headers }
  );
  return res;
}
