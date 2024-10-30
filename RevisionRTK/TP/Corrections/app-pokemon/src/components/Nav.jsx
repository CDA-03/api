import { Link } from 'react-router-dom'
function Nav() {

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto">
                <ul className="flex">
                    <li><Link to="/">Home</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav
