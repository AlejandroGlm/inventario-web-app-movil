import { Link } from "react-router-dom";
import userImg from "../../../public/dist/img/user1-128x128.jpg";
import stockLogo from "../../../public/dist/img/logo-corporativo.jpeg";

export const Menu = ({ nombre, usuario }) => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="../../index.html" className="brand-link">
                <img src={ stockLogo } alt="Logo de la aplicación" className="brand-image img-circle elevation-3" style={{ opacity: ".8"}} />
                <span className="brand-text font-weight-light">{ nombre }</span>
            </a>

            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src={ userImg } className="img-circle" alt="Fotografía del usuario" />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">{ usuario }</a>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item">
                            <Link to="/mobiliario" className="nav-link">
                                <i className="nav-icon fas fa-desktop"></i>
                                <p>
                                    Mobiliario
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/personas" className="nav-link">
                                <i className="nav-icon fas fa-users"></i>
                                <p>
                                    Personas
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/ubicaciones" className="nav-link">
                                <i className="nav-icon fas fa-building"></i>
                                <p>
                                    Ubicaciones
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/informes" className="nav-link">
                                <i className="nav-icon fas fa-chart-pie"></i>
                                <p>
                                    Informes
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/usuarios" className="nav-link">
                                <i className="nav-icon fas fa-user-lock"></i>
                                <p>
                                    Usuarios
                                </p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}