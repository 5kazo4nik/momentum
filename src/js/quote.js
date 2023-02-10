const qoutePlace = document.querySelector('.quote');
const authorPlace = document.querySelector('.author');
const changeQuoteButton = document.querySelector('.change-quote');

// Меняет цитату
function changeQuote() {
  changeQuoteButton.onclick = getQuote;
}

// Делает запрос и помещает ответ в поле цитаты и автора
async function getQuote() {
  const res = await fetch('https://api.quotable.io/random');
  const data = await res.json();
  qoutePlace.textContent = data.content;
  authorPlace.textContent = data.author;
}

export { getQuote, changeQuote };
