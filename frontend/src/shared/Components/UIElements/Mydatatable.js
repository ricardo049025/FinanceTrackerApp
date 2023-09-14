import React from 'react';
import DataTable from 'react-data-table-component';

const customStyles = {
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '16px',
      },
    },
    rows: {
      style: {
        fontSize: '14px',
      },
    },
  };

const Mydatatable = ({title,columns, data}) => {
    return (
      <div className="table-container">
        <DataTable
          title={title}
          columns={columns}
          data={data}
          customStyles={customStyles}
          pagination
          highlightOnHover
          responsive
        />
      </div>
    );
};

export default Mydatatable;
