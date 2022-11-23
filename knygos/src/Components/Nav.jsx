import { NavLink } from "react-router-dom";

function Nav({status}) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <span className="navbar-brand">Tailors shop</span>
                            <div>
                                <div className="navbar-nav">
                                    {status === 2 || status === 3 || status === 4 ? <NavLink to="/" end className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink> : null}
                                    {status === 3 ? <NavLink to="/country" className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Country</NavLink> : null}
                                    {status === 3 ? <NavLink to="/rubs" className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Rubs</NavLink> : null}
                                    {status === 3 ? <NavLink to="/orders" className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Orders</NavLink> : null}
                                    {status === 2 ? <NavLink to="/orderis" className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Orders</NavLink> : null}
                                    {status !== 1 ? <NavLink to="/logout" className="nav-link">Logout</NavLink> : null}
                                    {status === 1 ? <NavLink to="/register" className="nav-link">Register</NavLink> : null}
                                    {status === 1 ? <NavLink to="/login" className="nav-link">Login</NavLink> : null}
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Nav;