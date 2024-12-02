import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { DTable, Footer, Menu, Navbar, Title } from "../components";
import { useFetch } from "../hooks/useFetch.js";

export const Mobiliario = () => {

    const columnas = [
        { name: "Nombre", selector: (row) => row.nombre, sortable: true },
        { name: "Descripción", selector: (row) => row.descripcion },
        { name: "Tipo", selector: (row) => row.tipo },
        { name: "Estado", selector: (row) => row.estado },
        { name: "Activo", selector: (row) => row.activo ? "Sí" : "No" },
        { name: "Código", selector: (row) => row.codigo },
        {
            name: "Ubicación",
            selector: (row) => {
                const ubicacion = ubicaciones.find(u => u.id_ubicacion === row.id_ubicacion);
                return ubicacion ? `${ubicacion.edificio} - ${ubicacion.departamento} - ${ubicacion.area}` : "No disponible";
            },
        },
        {
            name: "QR",
            cell: (row) => (
                <QRCode
                    value={JSON.stringify({
                        identificador: row.identificador,
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
                        onClick={() => handleDelete(row.id_mobiliario)}
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
        descripcion: "",
        tipo: "",
        estado: "",
        activo: true,
        codigo: "",
        ubicacion: "",
    });

    const [mobiliario, setMobiliario] = useState([]);
    const [ubicaciones, setUbicaciones] = useState([]);
    const [editData, setEditData] = useState(null);
    const { getData, setData } = useFetch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener mobiliario
                const responseMobiliario = await getData(
                    "http://localhost/codeigniter3-rest-controller/index.php/Api/Mobiliario/"
                );
                if (responseMobiliario && responseMobiliario.data?.data) {
                    setMobiliario(responseMobiliario.data.data);
                }

                // Obtener ubicaciones
                const responseUbicaciones = await getData(
                    "http://localhost/codeigniter3-rest-controller/index.php/Api/Ubicacion/"
                );
                if (responseUbicaciones && responseUbicaciones.data?.data) {
                    setUbicaciones(responseUbicaciones.data.data);
                }
            } catch (error) {
                console.error("Error al realizar las solicitudes:", error);
            }
        };

        fetchData();
    }, []);

    // Manejar la edición

    const handleSave = async () => {
        const { nombre, descripcion, tipo, estado, activo, codigo, ubicacion } = formData;

        if (!nombre || !descripcion || !tipo || !estado || !activo || !codigo || !ubicacion) {
            alert("Por favor complete todos los campos.");
            return;
        }

        // Crear el objeto con la estructura esperada
        const dataToSend = {
            nombre: nombre,
            descripcion: descripcion,
            tipo: tipo,
            estado: estado,
            fecha_registro: new Date().toISOString(),  // Asignar la fecha actual en formato ISO
            activo: activo ? 1 : 0,  // Convertir el valor booleano en 1 o 0, si es necesario
            codigo: codigo,
            id_ubicacion: ubicacion
        };

        try {
            const response = await setData(
                "http://localhost/codeigniter3-rest-controller/index.php/Api/Mobiliario",
                dataToSend  // Enviar los datos con la estructura correcta
            );
            console.log("Respuesta de la API al agregar:", response);

            if (response && !response.error) {
                alert("Mobiliario agregado correctamente");
                setMobiliario((prevMobiliario) => [
                    ...prevMobiliario,
                    { ...dataToSend, id_ubicacion: ubicacion },  // Ajustar aquí también
                ]);
                setFormData({
                    nombre: "",
                    descripcion: "",
                    tipo: "",
                    estado: "",
                    activo: true,
                    codigo: "",
                    ubicacion: "",
                });
            } else {
                alert("Error al agregar el mobiliario: " + (response.message || "Error desconocido"));
            }
        } catch (error) {
            console.error("Error al guardar el mobiliario:", error);
            alert("Error al guardar el mobiliario: " + error.message);
        }
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


    const handleDelete = async (id) => {


        if (window.confirm("¿Estás seguro de que deseas eliminar este mobiliario?")) {
            console.log("Botón eliminar clickeado. ID:", id);
            if (!id) return;

            try {
                // Llamada a la API para eliminar el mobiliario por ID
                const response = await deleteData(
                    `http://localhost/codeigniter3-rest-controller/index.php/Api/Mobiliario/${id}`

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
        }
    };

    const handleEdit = (mobiliario) => {
        console.log("Editando ubicación:", mobiliario);
        setEditData(mobiliario);
        setFormData({
            nombre: mobiliario.nombre,
            descripcion: mobiliario.descripcion,
            tipo: mobiliario.tipo,
            estado: mobiliario.estado,
            activo: mobiliario.activo,
            codigo: mobiliario.codigo,
            ubicacion: mobiliario.ubicacion,
        });

        // Abrir modal de actualización
        const modal = new window.bootstrap.Modal(document.getElementById("modal-mobiliario"));
        modal.show();
    };

    // Actualizar id_mobiliario
    const handleActualizarmobiliario = async () => {
        console.log("EditData al intentar actualizar:", editData);

        if (!editData || !editData.id_mobiliario) {
            alert("ID de mobiliario no disponible");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost/codeigniter3-rest-controller/index.php/Api/Mobiliario/${editData.id_mobiliario}`, // URL con id_mobiliario
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
                alert("mobiliario actualizada correctamente");

                // Actualizar la lista de ubicaciones en el estado local
                setUbicaciones((prev) =>
                    prev.map((item) =>
                        item.id_mobiliario === editData.id_mobiliario ? { ...item, ...formData } : item
                    )
                );
                setMobiliario((prev) =>
                    prev.map((item) =>
                        item.id_mobiliario === editData.id_mobiliario ? { ...item, ...formData } : item
                    )
                );

                setEditData(null);
                setFormData({ nombre: "", descripcion: "", tipo: "", estado: "", activo: "", codigo: "", ubicacion: "", });

                // Cerrar el modal después de actualizar
                const modal = new window.bootstrap.Modal(document.getElementById("modal-ubicaciones"));
                modal.hide();
            } else {
                alert("Error al actualizar el mobiliario: " + data.message);
            }
        } catch (error) {
            console.error("Error al actualizar mobiliario:", error);
        }
        window.location.reload();
    };


    return (
        <>
            <Navbar />
            <Menu nombre="Inventario Mobiliario" usuario="Osvaldo" />
            <div className="content-wrapper">
                <Title title="Mobiliario" breadcrums={["Inicio", "Mobiliario"]} />
                <section className="content">
                    <div className="row">
                        {/* Formulario */}
                        <div className="col-md-4">
                            <div className="card card-warning">
                                <div className="card-header">
                                    <h3 className="card-title">Agregar Mobiliario</h3>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label>Nombre</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Ejemplo: Mesa"
                                                value={formData.nombre}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, nombre: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Descripción</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Descripción del mobiliario"
                                                value={formData.descripcion}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, descripcion: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Tipo</label>
                                            <select
                                                className="form-control"
                                                value={formData.tipo}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, tipo: e.target.value })
                                                }
                                            >
                                                <option value="">Seleccione</option>
                                                <option value="Muebles">Muebles</option>
                                                <option value="Equipo de cómputo">Equipo de cómputo</option>
                                                <option value="Equipo de laboratorio">Equipo de laboratorio</option>
                                                <option value="Artículo general">Artículo general</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Estado</label>
                                            <select
                                                className="form-control"
                                                value={formData.estado}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, estado: e.target.value })
                                                }
                                            >
                                                <option value="">Seleccione</option>
                                                <option value="Nuevo">Nuevo</option>
                                                <option value="Usado">Usado</option>
                                                <option value="En reparación">En reparación</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Activo</label>
                                            <select
                                                className="form-control"
                                                value={formData.activo}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, activo: e.target.value === "true" })
                                                }
                                            >
                                                <option value={true}>Sí</option>
                                                <option value={false}>No</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Código</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Código único"
                                                value={formData.codigo}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, codigo: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Ubicación</label>
                                            <select
                                                className="form-control"
                                                value={formData.ubicacion}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, ubicacion: e.target.value })
                                                }
                                            >
                                                <option value="">Seleccione</option>
                                                {ubicaciones.map((u) => (
                                                    <option key={u.id_ubicacion} value={u.id_ubicacion}>
                                                        {`${u.edificio} - ${u.departamento} - ${u.area}`}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() =>
                                            setFormData({
                                                nombre: "",
                                                descripcion: "",
                                                tipo: "",
                                                estado: "",
                                                activo: true,
                                                codigo: "",
                                                ubicacion: "",
                                            })
                                        }
                                    >
                                        Cancelar
                                    </button>
                                    <button className="btn btn-warning float-right" onClick={handleSave}>
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Tabla */}
                        <div className="col-md-8">
                            <div className="card card-warning">
                                <div className="card-header">
                                    <h3 className="card-title">Lista de Mobiliario</h3>
                                </div>
                                <div className="card-body">
                                    <DTable cols={columnas} info={mobiliario} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />


            {/* Modal para editar */}
            <div
                className="modal fade"
                id="modal-mobiliario"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="modal-editar-mobiliario-label"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content bg-warning">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modal-mobiliario-label">
                                Editar Mobiliario
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                    const modal = new window.bootstrap.Modal(
                                        document.getElementById("modal-mobiliario")
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
                                    <label>Nombre</label>
                                    <input
                                        className="form-control"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        placeholder="Ej. Mesa de oficina"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Descripción</label>
                                    <input
                                        className="form-control"
                                        name="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleChange}
                                        placeholder="Ej. Mesa rectangular"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tipo</label>
                                    <select
                                        className="form-control"
                                        value={formData.tipo}
                                        onChange={(e) =>
                                            setFormData({ ...formData, tipo: e.target.value })
                                        }
                                    >
                                        <option value="">Seleccione</option>
                                        <option value="Muebles">Muebles</option>
                                        <option value="Equipo de cómputo">Equipo de cómputo</option>
                                        <option value="Equipo de laboratorio">Equipo de laboratorio</option>
                                        <option value="Artículo general">Artículo general</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Estado</label>
                                    <select
                                        className="form-control"
                                        value={formData.estado}
                                        onChange={(e) =>
                                            setFormData({ ...formData, estado: e.target.value })
                                        }
                                    >
                                        <option value="">Seleccione</option>
                                        <option value="Nuevo">Nuevo</option>
                                        <option value="Usado">Usado</option>
                                        <option value="En reparación">En reparación</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Activo</label>
                                    <input
                                        type="checkbox"
                                        name="activo"
                                        checked={formData.activo}
                                        onChange={(e) =>
                                            setFormData({ ...formData, activo: e.target.checked })
                                        }
                                    />

                                    

                                </div>
                                <div className="form-group">
                                    <label>Código</label>
                                    <input
                                        className="form-control"
                                        name="codigo"
                                        value={formData.codigo}
                                        onChange={handleChange}
                                        placeholder="Ej. 12345"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Ubicación</label>
                                    <select
                                        name="ubicacion"
                                        value={formData.ubicacion}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        {ubicaciones.map((ubicacion) => (
                                            <option key={ubicacion.id_ubicacion} value={ubicacion.id_ubicacion}>
                                                {ubicacion.edificio} - {ubicacion.departamento} - {ubicacion.area}
                                            </option>
                                        ))}
                                    </select>
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
                                        document.getElementById("modal-mobiliario")
                                    );
                                    modal.hide();
                                }}
                            >
                                Cerrar
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleActualizarmobiliario}
                            >
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};
