import { useGetPokemonsQuery } from './store/services/pokemon'
import { NavLink } from 'react-router-dom'
import Layout from './components/Layout'
function App() {
  const { data, error, isLoading } = useGetPokemonsQuery(10)

  return (
    <Layout title="Pokemon API">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <ul>
          {data.results.map(({ name, url }) =>
            <li><NavLink to={`/pokemon/${name}`}>{name}</NavLink></li>
          )}
        </ul>
      ) : null}
    </Layout >
  )
}

export default App
