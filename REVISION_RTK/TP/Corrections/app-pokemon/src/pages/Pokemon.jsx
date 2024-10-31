import { useParams } from 'react-router-dom'
import { useGetPokemonByNameQuery } from '../store/services/pokemon'
import Layout from '../components/Layout'

function Pokemon() {
  const { name } = useParams()
  const { data, error, isLoading } = useGetPokemonByNameQuery(name)

  return (
    <Layout title="Pokemon page">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
          <audio className="appearance-none bg-black-200 p-2 rounded-md" controls>
            <source src={data.cries?.latest} type="audio/ogg" />
          </audio>
        </>
      ) : null}
    </Layout>
  )
}

export default Pokemon
