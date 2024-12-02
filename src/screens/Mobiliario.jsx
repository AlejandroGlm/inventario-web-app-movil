import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { DTable, Footer, Menu, Navbar, Title } from "../components";
import { useFetch } from "../hooks/useFetch.js";

export const Mobiliario = () => {

    const [formData, setFormData] = useState({
        identificador: "",
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
    const { getData, setData } = useFetch();


    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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

    const handleSave = async () => {
        const { identificador, nombre, descripcion, tipo, estado, activo, codigo, ubicacion } = formData;

        if (!identificador || !nombre || !descripcion || !tipo || !estado || !activo || !codigo || !ubicacion) {
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
                    identificador: "",
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


    const columnas = [
        { name: "Nombre", selector: (row) => row.nombre, sortable: true },
        { name: "Descripción", selector: (row) => row.descripcion },
        { name: "Tipo", selector: (row) => row.tipo },
        { name: "Estado", selector: (row) => row.estado },
        { name: "Activo", selector: (row) => row.activo ? "Sí" : "No" },
        { name: "Código", selector: (row) => row.codigo },
        { name: "ID Ubicación", selector: (row) => row.id_ubicacion },
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
                    <button className="btn btn-info btn-sm" title="Editar">
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
        },
    ];

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
                                            <label>Identificador</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Ejemplo: ZTE1241"
                                                value={formData.identificador}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, identificador: e.target.value })
                                                }
                                            />
                                        </div>
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
                                                identificador: "",
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
        </>
    );
};
