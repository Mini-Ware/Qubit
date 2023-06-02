/**
 * Reach out to the reddit API, and get the first page of results from
 * r/aww. Filter out posts without readily available images or videos,
 * and return a random result.
 * @returns The url of an image or video which is cute.
 */
export async function getArticles() {
  const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=3');
  const data = await response.json();
  const articles = data.results

  return articles
}
