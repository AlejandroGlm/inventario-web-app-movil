import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Informes, Mobiliario, Personas, Ubicaciones, Usuarios, Inicio } from "../screens";
import { Menu } from "../components";

export const MyRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/personas" element={ <Personas /> } />
            <Route path="informes" element={ <Informes /> } />
            <Route path="mobiliario" element={ <Mobiliario /> } />
            <Route path="ubicaciones" element={ <Ubicaciones /> } />
            <Route path="usuarios" element={ <Usuarios /> } />
            <Route index path="/" element={ <Inicio /> } />
            
            <Route path="menu" element={ <Menu /> } />
        </Routes>
    </BrowserRouter>
  )
}

