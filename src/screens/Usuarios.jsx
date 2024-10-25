import { DTable, Footer, Menu, Navbar, Title } from "../components"

export const Usuarios = () => {
    return (
        <>
            <Navbar />
            <Menu nombre="InventarioSys" usuario="Jaimito el Cartero" />
            <div className="content-wrapper">
                <Title title="Usuarios" breadcrums={["Personas", "Menú"]} />
                <section className="content">

                    <div className="row">
                        <div className="col-4">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4 className="card-title">Agregar persona</h4>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label>Matricula/Identificador/No. de empleado</label>
                                            <input className="form-control" placeholder="NX02154" />
                                        </div>
                                        <div className="form-group">
                                            <label>Nombre(s)</label>
                                            <input className="form-control" placeholder="Alfredo" />
                                        </div>
                                        <div className="form-group">
                                            <label>Apellido Paterno</label>
                                            <input className="form-control" placeholder="Adame" />
                                        </div>
                                        <div className="form-group">
                                            <label>Apellido Materno</label>
                                            <input className="form-control" placeholder="Buenrostro" />
                                        </div>
                                        <div className="form-group">
                                            <label>Teléfono</label>
                                            <input className="form-control" placeholder="111222333" />
                                        </div>
                                        <div className="form-group">
                                            <label>Correo electrónico</label>
                                            <input className="form-control" placeholder="yomero@correo.net" />
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-secondary">Cancelar</button>
                                    <button className="btn btn-lg btn-primary float-right">Aceptar</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="card card-primary">
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
        </>
    )
}