import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import { Navbar, Menu, Title, Footer, PieChart, BarsChart } from "../components";
import { useFetch } from "../hooks/useFetch";

export const Informes = () => {
    const { getData } = useFetch();
    const [personas, setPersonas] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [barChartData, setBarChartData] = useState({ xAxis: [], series: [] });
    const [pieChartData, setPieChartData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchCategory, setSearchCategory] = useState("persona"); // persona, ubicacion o mobiliario

    useEffect(() => {
        const fetchPersonas = async () => {
            try {
                const response = await getData(
                    "http://localhost/codeigniter3-rest-controller/index.php/Api/Mobiliario"
                );
                if (!response.error) {
                    const personasData = response.data?.data || [];
                    setPersonas(personasData);
                    setFilteredData(personasData); // Inicializa con todos los datos
                    updateCharts(personasData);
                } else {
                    console.error("Error al obtener Personas:", response.message);
                }
            } catch (error) {
                console.error("Error al realizar la solicitud:", error);
            }
        };

        fetchPersonas();
    }, []);

    const updateCharts = (data) => {
        const tipos = {};
        data.forEach((item) => {
            const tipo = item.tipo || "Desconocido";
            const cantidad = item.cantidad || 1;
            if (tipos[tipo]) {
                tipos[tipo] += cantidad;
            } else {
                tipos[tipo] = cantidad;
            }
        });

        const xAxis = Object.keys(tipos); // Categorías
        const series = Object.values(tipos); // Valores
        const pieData = xAxis.map((key, index) => ({ name: key, value: series[index] }));

        setBarChartData({ xAxis, series });
        setPieChartData(pieData);
    };

    useEffect(() => {
        if (barChartData.xAxis.length > 0 && barChartData.series.length > 0) {
            const chartDom = document.getElementById("bar-chart");
            const myChart = echarts.init(chartDom);
            const option = {
                title: { text: "Cantidad de Mobiliarios por Tipo", left: "center" },
                tooltip: { trigger: "axis" },
                xAxis: { type: "category", data: barChartData.xAxis },
                yAxis: { type: "value" },
                series: [{ name: "Cantidad", type: "bar", data: barChartData.series }],
            };
            myChart.setOption(option);
        }

        if (pieChartData.length > 0) {
            const chartDom = document.getElementById("pie-chart");
            const myChart = echarts.init(chartDom);
            const option = {
                title: { text: "Proporción de Mobiliarios", left: "center" },
                tooltip: { trigger: "item" },
                legend: { bottom: "0" },
                series: [
                    {
                        name: "Cantidad",
                        type: "pie",
                        radius: "50%",
                        data: pieChartData,
                    },
                ],
            };
            myChart.setOption(option);
        }
    }, [barChartData, pieChartData]);

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = personas.filter((item) => {
            const value = item[searchCategory]?.toLowerCase() || "";
            return value.includes(searchTerm.toLowerCase());
        });
        setFilteredData(filtered);
        updateCharts(filtered);
    };

    return (
        <>
            <Navbar />
            <Menu nombre="Inventario Movil" usuario="Osvaldo" />
            <div className="content-wrapper">
                <Title title="Informes" breadcrums={["Personas", "Menú"]} />
                <section className="content">
                    <div className="row">
                        {/* Filtros */}
                        <div className="col-4">
                            <div className="card card-warning">
                                <div className="card-header">
                                    <h4 className="card-title">Seleccionar filtros</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSearch}>
                                        <div className="form-group">
                                            <label>Empleado</label>
                                            <select className="form-control">
                                                <option>-Todos-</option>
                                                {personas.map((persona) => (
                                                    <option key={persona.id}>{persona.nombre}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Ubicación</label>
                                            <select className="form-control">
                                                <option>-Todas-</option>
                                                <option>Administración</option>
                                                <option>Recepción</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Tipo de artículo</label>
                                            <select className="form-control">
                                                <option>-Todos los tipos-</option>
                                                <option>Muebles</option>
                                                <option>Equipo de cómputo</option>
                                                <option>Equipo de laboratorio</option>
                                                <option>Artículo general</option>
                                                <option>Otro</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Fecha</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Buscar
                                        </button>
                                    </form>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-secondary">Cancelar</button>
                                    <button className="btn btn-lg btn-primary float-right">Aceptar</button>
                                </div>
                            </div>
                        </div>

                        {/* Gráficas */}
                        <div className="col-8">
                            <div className="row">
                                {/* Gráfica de Pastel */}
                                <div className="col-12">
                                    <div className="card card-success">
                                        <div className="card-header">
                                            <h4 className="card-title">Distribución por Tipo (Pastel)</h4>
                                        </div>
                                        <div className="card-body">
                                            <div id="pie-chart" style={{ width: "100%", height: "400px" }}></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Gráfica de Barras */}
                                <div className="col-12">
                                    <div className="card card-success">
                                        <div className="card-header">
                                            <h4 className="card-title">Cantidad por Tipo (Barras)</h4>
                                        </div>
                                        <div className="card-body">
                                            <div id="bar-chart" style={{ width: "100%", height: "300px" }}></div>
                                        </div>
                                    </div>
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
