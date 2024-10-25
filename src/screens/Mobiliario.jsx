import QRCode from "react-qr-code";
import { DTable, Footer, Menu, Navbar, Title } from "../components";

const columnas = [
    {
        name: 'Identificador',
        selector: row=> row.matricula
    },
    {
        name: 'Nombre',
        selector: row=> row.nombre
    },
    {
        name: 'Tipo',
        selector: row=> row.tipo
    },
    {
        name: 'Ubicación',
        selector: row=> row.ubicacion
    },
    {
        name: 'Opciones',
        selector: row => row.action
    }
];

const data = [
    {
        id: 1,
        matricula: "ZAQ0001",
        nombre: "Mesa",
        tipo: "Mueble de oficina",
        ubicacion: "Edificio D5 - 211",
        cell: (props) => (
            <button>Editar</button>
        )
    },
    {
        id: 2,
        matricula: "ZAQ0002",
        nombre: "Monitor",
        tipo: "Equipo de computo",
        ubicacion: "Edificio D5 - 211",
        cell: (props) => (
            <button>Editar</button>
        )
    },
]

export const Mobiliario = () => {
    return (
        <>
            <Navbar />
            <Menu nombre="Inventario Movil" usuario="Osvaldo" />
            <div className="content-wrapper">
                <Title title="Mobiliario" breadcrums={["Inicio", "Mobiliario"]} />
                <section className="content">

                    <div className="row">
                        <div className="col-4">
                            <div className="card card-warning">
                                <div className="card-header">
                                    <h4 className="card-title">Agregar mobiliario/artículo</h4>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label>Matricula / Identificador / No. inventario</label>
                                            <input className="form-control" placeholder="ZTE1241" />
                                        </div>
                                        <div className="form-group">
                                            <label>Nombre del mobiliario / artículo</label>
                                            <input className="form-control" placeholder="Mesa de madera" />
                                        </div>
                                        <div className="form-group">
                                            <label>Tipo de mobiliario</label>
                                            <select className="form-control">
                                                <option>Seleccione</option>
                                                <option>Muebles</option>
                                                <option>Equipo de cómputo</option>
                                                <option>Equipo de laboratorio</option>
                                                <option>Artículo de laboratorio</option>
                                                <option>Artículo general</option>
                                                <option>Otro</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Ubicación</label>
                                            <select className="form-control">
                                                <option>Seleccione</option>
                                                <option>Edificio D5 - 211</option>
                                                <option>Edificio K5 - 101</option>
                                                <option>Edificio D6 - 205</option>
                                                <option>Otro</option>
                                            </select>
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