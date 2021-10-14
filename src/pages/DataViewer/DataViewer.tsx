// eslint-disable
import { useEffect, useState } from 'react';
import CollapsibleTable from '../../components/CollapsibleTable/CollapsibleTable';
import { TableRowInterface } from '../../models/table-row.interface';
import './DataViewer.scss';
import { deleteItem, checkEmptyChild, retrieveData } from '../../services/dataService';

const DataViewer = () => {
  const [tableData, setTableData] = useState([] as TableRowInterface[]);

  useEffect(() => {
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
