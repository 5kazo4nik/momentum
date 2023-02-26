import { getRandomNum } from './backgroundSlider';

const qoutePlace = document.querySelector('.quote');
const authorPlace = document.querySelector('.author');
const changeQuoteButton = document.querySelector('.change-quote');

// Меняет цитату
function changeQuote(lng = 'en') {
  changeQuoteButton.addEventListener('click', () => getQuote(lng));
}

// Делает запрос и помещает ответ в поле цитаты и автора
async function getQuote(lng = 'en') {
  // const res = await fetch('https://api.quotable.io/random');
  const res = await fetch('../src/assets/json/quotes.json');
  const data = await res.json();
  const quoteData = data[getRandomNum(24)];
  const quote = quoteData[lng];
  qoutePlace.textContent = quote.q;
  authorPlace.textContent = quote.a;
}

export { getQuote, changeQuote };
