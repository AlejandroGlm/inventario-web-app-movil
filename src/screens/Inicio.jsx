import { DTable, Footer, Menu, Navbar, Title } from "../components";

export const Inicio = () => {
    return (
        <>
            <Navbar />
            <Menu nombre="Inventario Movil" usuario="Osvaldo" />
            <div className="content-wrapper">
                <Title title="Bienvenido(s)" breadcrums={["Menú principal"]} />
                <section className="content">

                    

                </section>
            </div>
            <Footer />
        </>
    )
}