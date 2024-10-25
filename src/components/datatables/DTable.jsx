import DataTable from 'react-data-table-component';
import PropTypes from 'prop-types';

const defaultValues = {
    cols: [
        {
            name: 'Identificador',
            selector: row=> row.matricula
        },
        {
            name: 'Nombre',
            selector: row=> row.nombre
        },
        {
            name: 'A. Paterno',
            selector: row=> row.paterno
        },
        {
            name: 'A. Materno',
            selector: row=> row.materno
        },
        {
            name: 'Teléfono',
            selector: row=> row.telefono
        },
        {
            name: 'Correo',
            selector: row=> row.correo
        },
    ],
    info: [
        {
            id: 1,
            matricula: "UTP0151341",
            nombre: "Osvaldo",
            paterno: "Gaspar",
            materno: "Rodriguez",
            telefono: "2213635406",
            correo: "alejandro89@gmail.com"
        },
        {
            id: 2,
            matricula: "UTP01544",
            nombre: "Itzel",
            paterno: "Guarneros",
            materno: "MEndez",
            telefono: "2231431329",
            correo: "itzelmendez@gmail.com"
        },
    ]
}

export const DTable = ({ cols=defaultValues.cols, info=defaultValues.info }) => {

    return (
        <DataTable
			columns={cols}
			data={info}
		/>
    )
}

DTable.propTypes = {
    cols: PropTypes.array,
    info: PropTypes.array,
}