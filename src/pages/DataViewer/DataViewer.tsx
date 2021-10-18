// eslint-disable
import React, { useState } from 'react';
import CollapsibleTable from '../../components/CollapsibleTable/CollapsibleTable';
import { TableRowInterface } from '../../models/table-row.interface';
import { checkEmptyChild, deleteItem, retrieveData } from '../../services/dataService';
import './DataViewer.scss';

const DataViewer = () => {
  const [tableData, setTableData] = useState([] as TableRowInterface[]);

  React.useEffect(() => {
    retrieveData()
      .then((response: TableRowInterface[]) => {
        setTableData(response);
      });
  }, []);

  /**
   * Delete a row.
   * @param {*} rowId The row id to delete.
   */
  const deleteRow = (rowId: string) => {
    const newTableData = [...tableData];
    deleteItem(newTableData, rowId);
    checkEmptyChild(newTableData);
    setTableData(newTableData);
  };

  return (
    <div className="DataViewer">
      <CollapsibleTable tableData={tableData} deleteRow={deleteRow} />
    </div>
  );
};

export default DataViewer;
