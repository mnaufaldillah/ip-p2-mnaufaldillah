import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    function handlerLogout() {
        localStorage.clear();
        navigate(`/login`);
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand">
                    Wide World of Football News
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to='/' className="nav-link">
                                Article
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/match' className="nav-link">
                                Match of The Day
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <button 
                                className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                            >
                                User
                            </button>

                            <ul className="dropdown-menu">
                                <li>
                                    <Link to='/bookmark' className="nav-link">
                                        Bookmark
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handlerLogout} className="nav-link">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;