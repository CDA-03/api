import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Pokemon from '../pages/Pokemon'

export default createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/pokemon/:name",
        element: <Pokemon />
    },

])