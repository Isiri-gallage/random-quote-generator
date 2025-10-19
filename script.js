const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");

async function getQuote() {
  quoteText.textContent = "Loading...";
  authorText.textContent = "";

  try {
    const response = await fetch("https://api.quotable.io/random");
    if (!response.ok) throw new Error("Quote API error");

    const data = await response.json();
    quoteText.textContent = `"${data.content}"`;
    authorText.textContent = `– ${data.author}`;
  } catch (error) {
    console.warn("Quote API failed, trying joke API...");

    try {
      const jokeResponse = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
      const jokeData = await jokeResponse.json();
      quoteText.textContent = `"${jokeData.joke}"`;
      authorText.textContent = "– Random Joke 😄";
    } catch (err) {
      quoteText.textContent = "Oops! Couldn't fetch a quote or joke.";
      authorText.textContent = "";
      console.error(err);
    }
  }
}

newQuoteBtn.addEventListener("click", getQuote);
