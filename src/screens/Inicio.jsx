import { Footer, Menu, Navbar, Title } from "../components";
import { Link } from "react-router-dom";

export const Inicio = () => {
    return (
        <>
            <Navbar />
            <Menu nombre="Inventario Movil" usuario="Osvaldo" />
            <div className="content-wrapper">
                <Title title="Bienvenido(s)" breadcrums={["Menú principal"]} />
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            {/* Card Mobiliario */}
                            <div className="col-md-3">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <i className="fas fa-desktop fa-3x mb-3"></i>
                                        <h5 className="card-title">Mobiliario</h5>
                                        <p className="card-text">Administra los muebles y equipos.</p>
                                        <Link to="/mobiliario" className="btn btn-primary">Ir</Link>
                                    </div>
                                </div>
                            </div>
                            {/* Card Ubicaciones */}
                            <div className="col-md-3">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <i className="fas fa-building fa-3x mb-3"></i>
                                        <h5 className="card-title">Ubicaciones</h5>
                                        <p className="card-text">Consulta y gestiona las ubicaciones.</p>
                                        <Link to="/ubicaciones" className="btn btn-primary">Ir</Link>
                                    </div>
                                </div>
                            </div>
                            {/* Card Reportes */}
                            <div className="col-md-3">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <i className="fas fa-chart-pie fa-3x mb-3"></i>
                                        <h5 className="card-title">Reportes</h5>
                                        <p className="card-text">Genera informes y reportes.</p>
                                        <Link to="/informes" className="btn btn-primary">Ir</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};
