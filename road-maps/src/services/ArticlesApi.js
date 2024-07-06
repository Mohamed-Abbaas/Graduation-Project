import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("jwt");
const headers = {
  Authorization: `Bearer ${token}`,
};
export function formatDate(input) {
  const date = new Date(input);
  const niceFormattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return niceFormattedDate;
}
export async function getArticle(id) {
  const response = await fetch(
    `https://knowledge-sharing-1.onrender.com/api/v1/articles/${id}`
  );
  const data = response.json();
  return data;
}
export async function getArticles() {
  const response = await axios.get(
    `https://knowledge-sharing-1.onrender.com/api/v1/articles`,
    { headers }
  );
  return response;
}
