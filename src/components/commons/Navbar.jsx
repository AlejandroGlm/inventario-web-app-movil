import { Link } from 'react-router-dom';
export const Navbar = () => {
    return (
        <nav className="main-header navbar navbar-expand navbar-warning navbar-black">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="/" className="nav-link">Inicio</Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="/" className="nav-link">Contactos</Link>
                </li>
            </ul>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i className="fas fa-expand-arrows-alt"></i>
                    </a>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" data-widget="fullscreen" href="/" role="button">
                        <i className="fas fa-sign-out-alt"></i>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}