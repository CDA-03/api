import { useGetPokemonByNameQuery } from './features/pokemon'
import { useState } from 'react'
import Root from './routes/Root'
import './App.css'

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const { data, error, isLoading } = useGetPokemonByNameQuery(
    pokemonName, { skip: (pokemonName === '') })

  return (
    <>
      <Root />
      <p><button onClick={() => setPokemonName('bulbasaur')}>Get Pokemon info bulbasaur </button></p>
      {error ? <p>Error</p> :
        isLoading ? <p>Loading ...</p> :
          data ? (
            <ul>
              <li>{data.name}</li>
              <li>{data.weight}</li>
            </ul>
          ) : null
      }
    </>
  )
}

export default App