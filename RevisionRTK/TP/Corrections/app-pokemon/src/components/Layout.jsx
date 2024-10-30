import Nav from "./Nav"

function Layout({ children, title }) {

    return (
        <div className="bg-black text-white">
            <Nav />
            <div className="container mx-auto p-8">
                <h1 className="text-4xl font-bold mb-4">{title || 'Pokemon'}</h1>
                {children}
            </div>
        </div>
    )
}

export default Layout