// TODO write your code here
const url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';
const cardTemplate = document.querySelector('#cardTemplate')
const cardsContainer = document.querySelector('#cardsContainer')
const infoTemplate = document.querySelector('#infoTemplate')
const infoContainer = document.querySelector('#infoContainer')


fetch(url)
  .then(response => response.json())
  .then((data) => {
    data.results.forEach((pokemon) => {
      fetch(pokemon.url)
        .then(response => response.json())
        .then((pokeData) => {
          const clone = cardTemplate.content.cloneNode(true);
          clone.querySelector('img').src = pokeData.sprites.front_default;
          clone.querySelector('p').innerText = pokeData.types.map(t => t.type.name).join(', ');
          clone.querySelector('h2').innerText = pokeData.name;
          clone.querySelector('a').addEventListener('click', () => {
            const infoClone = infoTemplate.content.cloneNode(true);
            infoContainer.innerHTML = '';
            infoClone.querySelector('img').src = pokeData.sprites.back_default;
            infoClone.querySelector('p').innerText = pokeData.types.map(t => t.type.name).join(', ');
            infoClone.querySelector('h2').innerText = pokeData.name;

            infoContainer.appendChild(infoClone)
          })

          cardsContainer.appendChild(clone)
        })
    });
  })
