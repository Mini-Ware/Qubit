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

  //articles embed
  const articlesEmbed = {
    color: 0x221c35,
    title: 'Stay Informed',
    description: 'Here is our selection of the most recent space happenings',
    fields: [
      {
        name: articles[0].title,
        value: articles[0].summary
      },
      {
        name: articles[1].title,
        value: articles[1].summary
      },
      {
        name: articles[2].title,
        value: articles[2].summary
      }
    ]
  };

  return articlesEmbed
}
