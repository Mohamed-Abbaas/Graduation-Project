const ApiURL = "https://knowledge-sharing-1.onrender.com/api";
export async function getPosts() {
  const data = await fetch(`${ApiURL}/v1/posts`);
  console.log(data);
  return data;
}
