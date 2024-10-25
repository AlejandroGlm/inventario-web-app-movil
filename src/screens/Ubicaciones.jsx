import { DTable, Footer, Menu, Navbar, Title } from "../components";
import QRCode from "react-qr-code";


const columnas = [
    {
        name: 'Identificador',
        selector: row=> row.matricula
    },
    {
        name: 'Ubicación',
        selector: row=> row.nombre
    },
    {
        name: 'Opciones',
        selector: row => row.action,
        cell: (props) => (
            <button className="btn btn-info btn-sm" title="Editar ubicación">
                <i className="fas fa-pen"></i>
            </button>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true
    }
];
const data = [
    {
        id: 1,
        matricula: "ZAQ0001",
        nombre: "Administración",
        cell: (props) => (
            <button>Editar</button>
        )
    },
    {
        id: 2,
        matricula: "ZAQ0002",
        nombre: "Recepción",
        cell: (props) => (
            <button>Editar</button>
        )
    },
]

export const Ubicaciones = () => {
    return (
        <>
            <Navbar />
            <Menu nombre="Inventario Movil" usuario="Osvaldo" />
            <div className="content-wrapper">
                <Title title="Ubicaciones" breadcrums={["Personas", "Menú"]} />
                <section className="content">

                    <div className="row">
                        <div className="col-4">
                            <div className="card card-warning">
                                <div className="card-header">
                                    <h4 className="card-title">Agregar ubicaciones</h4>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label>Nombre de la ubicación</label>
                                            <input className="form-control" placeholder="Edificio de administración" />
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
                                    <h4 className="card-title">Ubicaciones registradas</h4>
                                </div>
                                <div className="card-body">
                                    <DTable cols={ columnas } info={ data } />
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