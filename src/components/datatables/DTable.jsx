import DataTable from "react-data-table-component";
import PropTypes from "prop-types";

export const DTable = ({ cols, info }) => {
    return (
        <DataTable
            columns={cols}
            data={info}
            pagination
            noDataComponent="No hay datos disponibles"
        />
    );
};

DTable.propTypes = {
    cols: PropTypes.array.isRequired,
    info: PropTypes.array.isRequired,
};
