import React, { useEffect, useState, useRef } from "react";
import * as echarts from "echarts";
import { Navbar, Menu, Title, Footer } from "../components";
import { useFetch } from "../hooks/useFetch";

export const Informes = () => {
    const { getData } = useFetch();
    const [personas, setPersonas] = useState([]);
    const [mobiliario, setMobiliario] = useState([]);
    const [ubicaciones, setUbicaciones] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [barChartData, setBarChartData] = useState({ xAxis: [], series: [] });
    const [pieChartData, setPieChartData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchCategory, setSearchCategory] = useState("persona");

    // Referencias a los contenedores de los gráficos
    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);
    
    useEffect(() => {
        if (mobiliario.length > 0) {
            updateCharts(mobiliario); // Mostrar gráfico de mobiliario al cargar la página
        }
    }, [mobiliario]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseMobiliario = await getData(
                    "http://localhost/codeigniter3-rest-controller/index.php/Api/Mobiliario/"
                );
                setMobiliario(responseMobiliario?.data?.data || []);

                const responseUbicaciones = await getData(
                    "http://localhost/codeigniter3-rest-controller/index.php/Api/Ubicacion/"
                );
                setUbicaciones(responseUbicaciones?.data?.data || []);

                const responsePersonas = await getData(
                    "http://localhost/codeigniter3-rest-controller/index.php/Api/Personas"
                );
                setPersonas(responsePersonas?.data?.data || []);
            } catch (error) {
                console.error("Error al realizar las solicitudes:", error);
            }
        };

        fetchData();
    }, []);

    const updateCharts = (data) => {
        const categories = {};
    
        // Detectar la estructura de los datos para determinar qué campo usar
        data.forEach((item) => {
            let key = "Desconocido";
    
            if (item.nombre) {
                // Es una persona
                key = item.nombre;
            } else if (item.edificio) {
                // Es una ubicación
                key = item.edificio;
            } else if (item.tipo) {
                // Es mobiliario
                key = item.tipo;
            }
    
            // Incrementar el conteo para la categoría correspondiente
            if (categories[key]) {
                categories[key] += 1;
            } else {
                categories[key] = 1;
            }
        });
    
        const xAxis = Object.keys(categories); // Nombres de las categorías
        const series = Object.values(categories); // Conteos
        const pieData = xAxis.map((key, index) => ({ name: key, value: series[index] }));
    
        setBarChartData({ xAxis, series });
        setPieChartData(pieData);
    };
    
    

    const handleSearch = async (e) => {
        e.preventDefault();
        console.log("Buscando:", searchTerm, "en categoría:", searchCategory);
    
        try {
            let filtered = [];
            if (searchCategory === "persona") {
                filtered = personas.filter(persona =>
                    persona.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
                );
            } else if (searchCategory === "ubicacion") {
                filtered = ubicaciones.filter(ubicacion =>
                    ubicacion.edificio?.toLowerCase().includes(searchTerm.toLowerCase())
                );
            } else if (searchCategory === "tipo") {
                filtered = mobiliario.filter(item =>
                    item.tipo?.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
    
            console.log("Datos filtrados:", filtered);
            setFilteredData(filtered);
            updateCharts(filtered); // Asegúrate de actualizar las gráficas con los datos filtrados
        } catch (error) {
            console.error("Error al realizar la búsqueda:", error);
        }
    };
    

    useEffect(() => {
        if (barChartData.xAxis.length > 0 && barChartData.series.length > 0) {
            const barChart = barChartRef.current;
            const myChart = echarts.getInstanceByDom(barChart) || echarts.init(barChart);

            myChart.setOption({
                title: { text: "Cantidad por Tipo", left: "center" },
                tooltip: { trigger: "axis" },
                xAxis: { type: "category", data: barChartData.xAxis },
                yAxis: { type: "value" },
                series: [{ name: "Cantidad", type: "bar", data: barChartData.series }],
            });
        }
    }, [barChartData]);

    useEffect(() => {
        if (pieChartData.length > 0) {
            const pieChart = pieChartRef.current;
            const myChart = echarts.getInstanceByDom(pieChart) || echarts.init(pieChart);

            myChart.setOption({
                title: { text: "Proporción", left: "center" },
                tooltip: { trigger: "item" },
                legend: { bottom: "0" },
                series: [{ name: "Cantidad", type: "pie", radius: "50%", data: pieChartData }],
            });
        }
    }, [pieChartData]);

    return (
        <>
            <Navbar />
            <Menu nombre="Inventario Movil" usuario="Osvaldo" />
            <div className="content-wrapper">
                <Title title="Informes" breadcrums={["Personas", "Menú"]} />
                <section className="content">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Buscar y Filtrar</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSearch}>
                                        <div className="form-group">
                                            <label htmlFor="searchCategory">Categoría de Búsqueda</label>
                                            <select
                                                className="form-control"
                                                id="searchCategory"
                                                value={searchCategory}
                                                onChange={(e) => setSearchCategory(e.target.value)}
                                            >
                                                <option value="persona">Persona</option>
                                                <option value="ubicacion">Ubicación</option>
                                                <option value="tipo">Mobiliario</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="searchTerm">Término de Búsqueda</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="searchTerm"
                                                placeholder="Ingrese término a buscar"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Buscar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card card-success">
                                <div className="card-header">
                                    <h3 className="card-title">Gráfica de Barras</h3>
                                </div>
                                <div className="card-body">
                                    <div ref={barChartRef} style={{ width: "100%", height: "300px" }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="card card-warning">
                                <div className="card-header">
                                    <h3 className="card-title">Gráfica de Pastel</h3>
                                </div>
                                <div className="card-body">
                                    <div ref={pieChartRef} style={{ width: "100%", height: "400px" }}></div>
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
