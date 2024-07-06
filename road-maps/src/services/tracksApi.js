const ApiURL = "https://knowledge-sharing-1.onrender.com/api/v1/";
export async function getTracks() {
  const res = await fetch(`${ApiURL}tracks`);
  if (!res.ok) throw new Error("Error while fetching the tracks data");
  const { data } = await res.json();
  return data;
}
export async function getTrack(slug) {
  const res = await fetch(`${ApiURL}tracks/${slug}`);
  if (!res.ok) throw new Error("Error while fetching the companies data");
  const { data } = await res.json();
  return data;
}
export async function getSteps(slug) {
  const res = await fetch(`${ApiURL}tracks/${slug}/details/steps`);
  const { data } = await res.json();
  return data;
}
export async function getRoadMap(slug) {
  const res = await fetch(`${ApiURL}tracks/${slug}/details`);
  const { data } = await res.json();
  return data;
}
export async function getArticles(slug) {
  const res = await fetch(`${ApiURL}tracks/${slug}/articles`);
  const { data } = await res.json();
  return data;
}
export function getSource(slug) {
  if (slug == "front-end")
    return "http://knowledge-sharing-1.onrender.com/img/tracks/front-end.jpeg";
  if (slug == "artificial-intelligence")
    return "http://knowledge-sharing-1.onrender.com/img/tracks/AI.jpg";
  if (slug == "back-end")
    return "http://knowledge-sharing-1.onrender.com/img/tracks/back-end.png";
  if (slug == "cyber-security")
    return "http://knowledge-sharing-1.onrender.com/img/tracks/cyber-security.jpg";
  if (slug == "mobile-development")
    return "http://knowledge-sharing-1.onrender.com/img/tracks/mobile.jpg";
  if (slug == "DevOps")
    return "http://knowledge-sharing-1.onrender.com/img/tracks/DevOps.jpg";
  if (slug == "computer-skills")
    return "http://knowledge-sharing-1.onrender.com/img/tracks/computer-skills.jpg";
  if (slug == "computer-funamentals")
    return "http://knowledge-sharing-1.onrender.com/img/tracks/fundamentals-of-programming.jpg";
}
export function getFirst(name) {
  if (name == "Introduction into Dart programming") name = "Intro in Dart";
  if (name == "Understanding Computer Basics") name = "Computer Basics";
  return name;
}
