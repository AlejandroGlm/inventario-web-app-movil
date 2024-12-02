import { useState, useEffect } from "react";
import { DTable, Footer, Menu, Navbar, Title } from "../components";
import QRCode from "react-qr-code";
import { useFetch } from "../hooks/useFetch.js";

export const Personas = () => {

    const columnas = [
        { name: "Nombre", selector: (row) => row.nombre, sortable: true },
        { name: "Apaterno", selector: (row) => row.apaterno },
        { name: "Amaterno", selector: (row) => row.amaterno },
        { name: "Matricula", selector: (row) => row.matricula },
        { name: "Telefono", selector: (row) => row.telefono },
        { name: "Correo", selector: (row) => row.correo },

        {
            name: "QR",
            cell: (row) => (
                <QRCode
                    value={JSON.stringify({
                        matricula: row.matricula,
                        nombre: row.nombre,
                    })}
                    size={50}
                />
            ),
        },
        {
            name: "Opciones",
            cell: (row) => (
                <>
                    <button className="btn btn-info btn-sm" title="Editar" onClick={() => handleEdit(row)}>
                        <i className="fas fa-pen"></i>
                    </button>
                    <button
                        className="btn btn-danger btn-sm ml-2"
                        title="Eliminar"
                        onClick={() => handleDelete(row.id_persona)}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
        },
    ];


     const [formData, setFormData] = useState({
         nombre: "",
         apaterno: "",
         amaterno: "",
         matricula: "",
         telefono: "",
         correo: "",
     });

    const [personas, setPersonas] = useState([]);
    const [editData, setEditData] = useState(null);
    const { getData, setData } = useFetch();


    useEffect(() => {
        const fetchPersonas = async () => {
            try {
                const response = await getData(
                    "http://localhost/codeigniter3-rest-controller/index.php/Api/Personas"
                );
                console.log("Datos obtenidos de la API:", response);
                if (!response.error) {
                    const personasData = response.data?.data || [];
                    setPersonas(personasData);
                } else {
                    console.error("Error al obtener Personas:", response.message);
                }
            } catch (error) {
                console.error("Error al realizar la solicitud:", error);
            }
        };

        fetchPersonas();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Agregar nueva ubicación
    const handleAgregarPersona = async () => {
        const { nombre, apaterno, amaterno, matricula ,telefono , correo } = formData;

        if (!nombre || !apaterno || !amaterno || !matricula || !telefono || !correo) {
            alert("Todos los campos son obligatorios");
            return;
        }

        try {
            const response = await setData(
                "http://localhost/codeigniter3-rest-controller/index.php/Api/Personas",
                formData
            );

            console.log("Respuesta de la API al agregar:", response);

            if (!response.error) {
                alert("Persona agregada correctamente");
                setPersonas((prev) => [...prev, { ...formData, id: response.id }]);
                setFormData({ nombre : "", apaterno:"", amaterno:"", matricula:"" ,telefono:"" , correo:"" });
            } else {
                alert("Error al agregar la persona: " + response.message);
            }
        } catch (error) {
            console.error("Error al agregar la persona:", error);
        }
    };

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
                                            <input className="form-control" name="matricula" value={formData.matricula}  onChange={handleChange}  placeholder="UTP0151431" />
                                        </div>
                                        <div className="form-group">
                                            <label>Nombre(s)</label>
                                            <input className="form-control" name="nombre" value={formData.nombre}  onChange={handleChange} placeholder="Osvaldo" />
                                        </div>
                                        <div className="form-group">
                                            <label>Apellido Paterno</label>
                                            <input className="form-control" name="amaterno" value={formData.amaterno}  onChange={handleChange} placeholder="Gaspar" />
                                        </div>
                                        <div className="form-group">
                                            <label>Apellido Materno</label>
                                            <input className="form-control" name="apaterno" value={formData.apaterno}  onChange={handleChange} placeholder="Rodriguez" />
                                        </div>
                                        <div className="form-group">
                                            <label>Teléfono</label>
                                            <input className="form-control" name="telefono" value={formData.telefono}  onChange={handleChange} placeholder="2213635406" />
                                        </div>
                                        <div className="form-group">
                                            <label>Correo electrónico</label>
                                            <input className="form-control" name="correo" value={formData.correo}  onChange={handleChange} placeholder="alejandrogaspar89@gmail.com" />
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-secondary">Cancelar</button>
                                    <button className="btn btn-lg btn-warning float-right" onClick={handleAgregarPersona}>Aceptar</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="card card-warning">
                                <div className="card-header">
                                    <h4 className="card-title">Personas registradas</h4>
                                </div>
                                <div className="card-body">
                                <DTable cols={columnas} info={personas} />
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