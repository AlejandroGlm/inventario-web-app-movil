import { useState, useEffect } from "react";
import { DTable, Footer, Menu, Navbar, Title } from "../components";
import { useFetch } from "../hooks/useFetch.js";
import QRCode from "react-qr-code";

const columnas = [
    { name: "Edificio", selector: (row) => row.edificio },
    { name: "Departamento", selector: (row) => row.departamento },
    { name: "Área", selector: (row) => row.area },
    {
        name: "Opciones",
        selector: (row) => row.action,
        cell: (props) => (
            <button className="btn btn-info btn-sm" title="Editar ubicación">
                <i className="fas fa-pen"></i>
            </button>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: "true",
    },
];

export const Ubicaciones = () => {
    const [formData, setFormData] = useState({
        edificio: "",
        departamento: "",
        area: "",
    });
    const [ubicaciones, setUbicaciones] = useState([]); // Inicializamos como un array vacío
    const { getData, setData } = useFetch();

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Obtener ubicaciones al cargar la página
    useEffect(() => {
        const fetchUbicaciones = async () => {
            try {
                const response = await getData(
                    "http://localhost/codeigniter3-rest-controller/index.php/Api/Ubicacion"
                );
                console.log(response); // Verifica la respuesta de la API
                
                if (!response.error) {
                    // Extrae los datos relevantes desde el nivel correcto
                    const ubicacionesData = response.data?.data || [];
                    setUbicaciones(ubicacionesData); // Actualiza el estado con los datos correctos
                } else {
                    console.error("Error al obtener ubicaciones:", response.message);
                }
            } catch (error) {
                console.error("Error al realizar la solicitud:", error);
            }
        };
    
        fetchUbicaciones();
    }, []); // Ejecuta solo una vez al cargar el componente

    // Manejar el envío del formulario
    const handleAgregarUbicacion = async () => {
        const { edificio, departamento, area } = formData;

        if (!edificio || !departamento || !area) {
            alert("Todos los campos son obligatorios");
            return;
        }

        const response = await setData(
            "http://localhost/codeigniter3-rest-controller/index.php/Api/Ubicacion",
            formData
        );

        if (!response.error) {
            alert(response.message);
            setUbicaciones((prev) => [...prev, formData]);  
            setFormData({ edificio: "", departamento: "", area: "" });  
        } else {
            alert("Error al agregar la ubicación: " + response.message);
        }
    };

    return (
        <>
            <Navbar />
            <Menu nombre="Inventario Movil" usuario="Osvaldo" />
            <div className="content-wrapper">
                <Title title="Ubicaciones" breadcrums={["Inicio", "Ubicaciones"]} />
                <section className="content">
                    <div className="row">
                        {/* Formulario */}
                        <div className="col-4">
                            <div className="card card-warning">
                                <div className="card-header">
                                    <h4 className="card-title">Agregar ubicaciones</h4>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label>Edificio</label>
                                            <input
                                                className="form-control"
                                                name="edificio"
                                                value={formData.edificio}
                                                onChange={handleChange}
                                                placeholder="Ej. K5"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Departamento</label>
                                            <input
                                                className="form-control"
                                                name="departamento"
                                                value={formData.departamento}
                                                onChange={handleChange}
                                                placeholder="Ej. Tecnologías de la información"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Área</label>
                                            <input
                                                className="form-control"
                                                name="area"
                                                value={formData.area}
                                                onChange={handleChange}
                                                placeholder="Ej. Laboratorio 108"
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-secondary" onClick={() => setFormData({ edificio: "", departamento: "", area: "" })}>
                                        Cancelar
                                    </button>
                                    <button
                                        className="btn btn-lg btn-warning float-right"
                                        onClick={handleAgregarUbicacion}
                                    >
                                        Aceptar
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Tabla */}
                        <div className="col-8">
                            <div className="card card-warning">
                                <div className="card-header">
                                    <h4 className="card-title">Ubicaciones registradas</h4>
                                </div>
                                <div className="card-body">
                                    <DTable cols={columnas} info={ubicaciones} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />

            {/* Modal QR (Opcional) */}
            <div className="modal fade" id="modal-default">
                <div className="modal-dialog">
                    <div className="modal-content bg-warning">
                        <div className="modal-header">
                            <h4 className="modal-title">Código QR generado</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <QRCode value="Este es mi código QR" />
                        </div>
                        <div className="modal-footer justify-content-between">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">
                                Cerrar
                            </button>
                            <button type="button" className="btn btn-primary">
                                Guardar cambios
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
