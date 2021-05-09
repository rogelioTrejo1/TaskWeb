import React from "react";
import { Link, useHistory } from "react-router-dom";

const Navigation = ({ token }: PropsNavigation) => {
    const history = useHistory();
    
    const logout = (): void => {
        localStorage.removeItem("token");
        history.push("/login");
    };

    // Render Component
    if (!token)
        return (
            <header className="navbar navbar-dark bg-dark">
                <Link to="/" className="text-white text-decoration-none h1">Task-Web</Link>
                <ul className="nav ml-auto">
                    <li className="nav-item">
                        <Link to="/login" className="nav-link text-white">Sing in</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-link text-white">Sing up</Link>
                    </li>
                </ul>
            </header>
        );
    else 
        return(
            <header className="navbar navbar-dark bg-dark">
                <Link to="/" className="text-white text-decoration-none h1" onClick={() => logout()}>Task-Web</Link>
                <form className="form-inline">
                    <input type="text" className="form-control" placeholder="Search a Task" />
                    <button type="submit" className="btn btn-secondary ml-3">Search</button>
                </form>
            </header>
        );
};

interface PropsNavigation {
    token?: string;
}

export default Navigation;