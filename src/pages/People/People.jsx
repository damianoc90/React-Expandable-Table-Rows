import React, { useEffect, useState } from 'react';
import CollapsibleTable from '../../components/CollapsibleTable/CollapsibleTable';
import retrievePeoples from '../../services/dataService';
import './People.scss';

const People = () => {
  const [tableData, setTableData] = useState([]);
  const uuidv4 = require('uuid/v4');

  useEffect(() => {
    retrievePeoples().then(response => {
      addUniqueId(response);
      setTableData(response);
    });
  }, []);

/**
 * Add an unique id to dataset rows.
 * @param {*} data The original dataset.
 */
  const addUniqueId = data => {
    Object.keys(data).forEach(key => {
      data[key]['_id'] = uuidv4();
      const kids = data[key].kids;
      if (!!kids && Object.values(kids).length) {
        const children = kids[Object.keys(kids)[0]].records;
        addUniqueId(children);
      }
    });
  };

  /**
   * Delete a row.
   * @param {*} rowId The row id to delete.
   */
  const deleteRow = rowId => {
    const newTableData = [...tableData];
    deleteRecursive(newTableData, rowId);
    checkEmptyChild(newTableData);
    setTableData(newTableData);
  };

  /**
   * Used by deleteRow function.
   * @param {*} data The starting dataset.
   * @param {*} id The row id to delete.
   */
  const deleteRecursive = (data, id) => {
    data.forEach((row, index) => {
      if (row._id === id) {
        data.splice(index, 1);
      }

      if (!!row.kids && Object.values(row.kids).length) {
        deleteRecursive(row.kids[Object.keys(row.kids)[0]].records, id);
      }
    });
  };

  /**
   * Normilize the dataset by removing the empty child.
   * @param {*} data The starting dataset.
   */
  const checkEmptyChild = data => {
    data.forEach(row => {
      if (!!row.kids && Object.values(row.kids).length && !row.kids[Object.keys(row.kids)[0]].records.length) {
        row.kids = {};
      }
    });
  };

  return (
    <div className="People">
      <CollapsibleTable tableData={tableData} deleteRow={deleteRow} />
    </div>
  );
};

export default People;
