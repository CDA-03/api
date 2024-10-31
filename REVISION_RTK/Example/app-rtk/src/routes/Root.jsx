import { NavLink } from "react-router-dom"

export default function Root() {
    return (
        <>
            <NavLink
                to="/login"
                style={({ isActive, isPending, isTransitioning }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isPending ? "red" : "black",
                        viewTransitionName: isTransitioning ? "slide" : "",
                    };
                }}
            >
                Login
            </NavLink>
            <NavLink
                to="/pastries"
                style={({ isActive, isPending, isTransitioning }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isPending ? "red" : "black",
                        viewTransitionName: isTransitioning ? "slide" : "",
                    };
                }}
            >
                Admin
            </NavLink>
        </>
    );
}