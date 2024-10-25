import { DTable, Footer, Menu, Navbar, Title } from "../components";
import QRCode from "react-qr-code";


export const Personas = () => {
    return (
        <>
            <Navbar />
            <Menu nombre="Inventario Movil" usuario="Osvaldo" />
            <div className="content-wrapper">
                <Title title="Personas" breadcrums={["Personas", "Menú"]} />
                <section className="content">

                    <div className="row">
                        <div className="col-4">
                            <div className="card card-warning">
                                <div className="card-header">
                                    <h4 className="card-title">Agregar persona</h4>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label>Matricula/Identificador/No. de empleado</label>
                                            <input className="form-control" placeholder="UTP0151431" />
                                        </div>
                                        <div className="form-group">
                                            <label>Nombre(s)</label>
                                            <input className="form-control" placeholder="Osvaldo" />
                                        </div>
                                        <div className="form-group">
                                            <label>Apellido Paterno</label>
                                            <input className="form-control" placeholder="Gaspar" />
                                        </div>
                                        <div className="form-group">
                                            <label>Apellido Materno</label>
                                            <input className="form-control" placeholder="Rodriguez" />
                                        </div>
                                        <div className="form-group">
                                            <label>Teléfono</label>
                                            <input className="form-control" placeholder="2213635406" />
                                        </div>
                                        <div className="form-group">
                                            <label>Correo electrónico</label>
                                            <input className="form-control" placeholder="alejandrogaspar89@gmail.com" />
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-secondary">Cancelar</button>
                                    <button className="btn btn-lg btn-warning float-right" data-toggle="modal" data-target="#modal-default">Aceptar</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="card card-warning">
                                <div className="card-header">
                                    <h4 className="card-title">Personas registradas</h4>
                                </div>
                                <div className="card-body">
                                    <DTable />
                                </div>
                            </div>
                        </div> 
                    </div>

                </section>
                
            </div>
            
            <Footer />
            <div className="modal fade" id="modal-default" >
                <div className="modal-dialog">
                    <div className="modal-content bg-warning">
                        <div className="modal-header">
                            <h4 className="modal-title">Codigo QR generado</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <QRCode value="Este es mi código QR" />
                        </div>
                        <div className="modal-footer justify-content-between">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}