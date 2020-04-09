
// Reusable async function to fetch data from the provided url
async function getAPIData(url) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

// now, use the async getAPIData function
getAPIData('https://pokeapi.co/api/v2/pokemon/?&limit=25').then((data) => {
  for (const pokemon of data.results) {
    getAPIData(pokemon.url).then((pokeData) => {
      populatePokeCard(pokeData)
    })
  }
})

let pokemonGrid = document.querySelector('.pokemonGrid')

function populatePokeCard(singlePokemon) {
    let pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    let pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () =>
      pokeCard.classList.toggle('is-flipped'),
    )
    let pokeFront = document.createElement('div')
    pokeFront.className = 'card__face card__face--front'
    pokeFront.textContent = singlePokemon.name
    let pokeBack = document.createElement('div')
    pokeBack.className = 'card__face card__face--back'
    pokeBack.textContent = 'back'

    pokeCard.appendChild(pokeFront)
    pokeCard.appendChild(pokeBack)
    pokeScene.appendChild(pokeCard)
    pokemonGrid.appendChild(pokeScene)
}
// https://github.com/fanzeyi/pokemon.json/blob/master/images/001.png?raw=true
