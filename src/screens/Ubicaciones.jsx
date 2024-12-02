import { useState, useEffect } from "react";
import { DTable, Footer, Menu, Navbar, Title } from "../components";
import { useFetch } from "../hooks/useFetch.js";

export const Ubicaciones = () => {

    //#region Metodos
    const [formData, setFormData] = useState({
        edificio: "",
        departamento: "",
        area: "",
    });
    const [ubicaciones, setUbicaciones] = useState([]);
    const [editData, setEditData] = useState(null);
    const { getData, setData } = useFetch();



    // Obtener ubicaciones al cargar la página
    useEffect(() => {
        const fetchUbicaciones = async () => {
            try {
                const response = await getData(
                    "http://localhost/codeigniter3-rest-controller/index.php/Api/Ubicacion"
                );
                console.log("Datos obtenidos de la API:", response);
                if (!response.error) {
                    const ubicacionesData = response.data?.data || [];
                    setUbicaciones(ubicacionesData);
                } else {
                    console.error("Error al obtener ubicaciones:", response.message);
                }
            } catch (error) {
                console.error("Error al realizar la solicitud:", error);
            }
        };

        fetchUbicaciones();
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejar la edición
    const handleEdit = (ubicacion) => {
        console.log("Editando ubicación:", ubicacion); 
        setEditData(ubicacion);
        setFormData({
            edificio: ubicacion.edificio,
            departamento: ubicacion.departamento,
            area: ubicacion.area,
        });
    
        // Abrir modal de actualización
        const modal = new window.bootstrap.Modal(document.getElementById("modal-ubicaciones"));
        modal.show();
    };

    const deleteData = async (url) => {
        try {
            const response = await fetch(url, {
                method: "DELETE",
            });
            const data = await response.json();
            return { data, error: !response.ok, message: data.message || response.statusText };
        } catch (error) {
            console.error("Error en la solicitud DELETE:", error);
            return { error: true, message: error.message };
        }
    };

    // Actualizar ubicación
    const handleActualizarUbicacion = async () => {
        console.log("EditData al intentar actualizar:", editData);
    
        if (!editData || !editData.id_ubicacion) {
            alert("ID de ubicación no disponible");
            return;
        }
    
        try {
            const response = await fetch(
                `http://localhost/codeigniter3-rest-controller/index.php/Api/Ubicacion/${editData.id_ubicacion}`, // URL con id_ubicacion
                {
                    method: 'PUT',  // Coloca el verbo HTTP PUT dentro del objeto de configuración
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),  
                }
            );
    
            const data = await response.json();  // Parsear la respuesta JSON
    
            console.log("Respuesta de la API:", data);
    
            if (!data.error) {
                alert("Ubicación actualizada correctamente");
    
                // Actualizar la lista de ubicaciones en el estado local
                setUbicaciones((prev) =>
                    prev.map((item) =>
                        item.id_ubicacion === editData.id_ubicacion ? { ...item, ...formData } : item
                    )
                );
    
                setEditData(null);
                setFormData({ edificio: "", departamento: "", area: "" });
    
                // Cerrar el modal después de actualizar
                const modal = new window.bootstrap.Modal(document.getElementById("modal-ubicaciones"));
                modal.hide();
            } else {
                alert("Error al actualizar la ubicación: " + data.message);
            }
        } catch (error) {
            console.error("Error al actualizar la ubicación:", error);
        }
    };
    
    
    
    

    // Eliminar ubicación
    const handleEliminar = async (id) => {
        console.log("Botón eliminar clickeado. ID:", id);
        if (!id) return;
    
        try {
            const response = await deleteData(
                `http://localhost/codeigniter3-rest-controller/index.php/Api/Ubicacion/${id}`
            );
    
            console.log("Respuesta de la API al eliminar:", response);
    
            if (!response.error) {
                alert("Ubicación eliminada correctamente");
                // Refrescar la página después de eliminar
                window.location.reload();
            } else {
                alert("Error al eliminar la ubicación: " + response.message);
            }
        } catch (error) {
            console.error("Error al eliminar la ubicación:", error);
        }
    };

    // Agregar nueva ubicación
    const handleAgregarUbicacion = async () => {
        const { edificio, departamento, area } = formData;

        if (!edificio || !departamento || !area) {
            alert("Todos los campos son obligatorios");
            return;
        }

        try {
            const response = await setData(
                "http://localhost/codeigniter3-rest-controller/index.php/Api/Ubicacion",
                formData
            );

            console.log("Respuesta de la API al agregar:", response);

            if (!response.error) {
                alert("Ubicación agregada correctamente");
                setUbicaciones((prev) => [...prev, { ...formData, id: response.id }]);
                setFormData({ edificio: "", departamento: "", area: "" });
            } else {
                alert("Error al agregar la ubicación: " + response.message);
            }
        } catch (error) {
            console.error("Error al agregar la ubicación:", error);
        }
    };

    const columnas = [
        { name: "Edificio", selector: (row) => row.edificio },
        { name: "Departamento", selector: (row) => row.departamento },
        { name: "Área", selector: (row) => row.area },
        {
            name: "Opciones",
            cell: (row) => (
                <>
                    <button
                        className="btn btn-info btn-sm"
                        title="Editar ubicación"
                        onClick={() => handleEdit(row)}
                    >
                        <i className="fas fa-pen"></i>
                    </button>
                    <button
                        className="btn btn-danger btn-sm ml-2"
                        title="Eliminar ubicación"
                        onClick={() => handleEliminar(row.id_ubicacion)} 
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
        },
    ];

//#endregion
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
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            setEditData(null);
                                            setFormData({ edificio: "", departamento: "", area: "" });
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className="btn btn-lg btn-warning float-right"
                                        onClick={handleAgregarUbicacion}
                                    >
                                        {"Aceptar"}
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

            <div
                className="modal fade"
                id="modal-ubicaciones"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="modal-ubicaciones-label"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content bg-warning">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modal-ubicaciones-label">
                                Actualizar Ubicación
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                    const modal = new window.bootstrap.Modal(
                                        document.getElementById("modal-ubicaciones")
                                    );
                                    modal.hide();
                                }}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
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
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={() => {
                                    const modal = new window.bootstrap.Modal(
                                        document.getElementById("modal-ubicaciones")
                                    );
                                    modal.hide();
                                }}
                            >
                                Cerrar
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleActualizarUbicacion}
                            >
                                Actualizar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
