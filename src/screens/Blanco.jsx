import { Footer } from "../components/commons/Footer"
import { Menu } from "../components/commons/Menu"
import { Navbar } from "../components/commons/Navbar"
import { Title } from "../components/commons/Title"

export const Personas = () => {
    return (
        <>
            <Navbar />
            <Menu />
            <div className="content-wrapper">
                <Title />
                <section className="content">

                </section>
            </div>
            <Footer />
        </>
    )
}