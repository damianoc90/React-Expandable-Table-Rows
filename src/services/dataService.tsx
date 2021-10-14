import { TableRowInterface } from "../models/table-row.interface";
const uuidv4 = require('uuid/v4');

export const retrieveData = () =>
  fetch('example-data.json', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(response =>
    response.json()
  ).then((data: TableRowInterface[]) => {
    addUniqueId(data);
    return data;
  });

/**
* Add an unique id to dataset rows.
* @param {*} data The original dataset.
*/
const addUniqueId = (data: TableRowInterface[]) => {
  data.forEach(row => {
    row._id = uuidv4();
    const kids = row.kids;
    if (!!kids && Object.values(kids).length) {
      const children = kids[Object.keys(kids)[0]].records;
      addUniqueId(children);
    }
  });
};

/**
 * Used by deleteRow function.
 * @param {*} data The starting dataset.
 * @param {*} id The row id to delete.
 */
export const deleteItem = (data: TableRowInterface[], id: string) => {
  data.forEach((row, index) => {
    if (row._id === id) {
      data.splice(index, 1);
    }

    if (!!row.kids && Object.values(row.kids).length) {
      deleteItem(row.kids[Object.keys(row.kids)[0]].records, id);
    }
  });
};

/**
 * Normilize the dataset by removing the empty child.
 * @param {*} data The starting dataset.
 */
export const checkEmptyChild = (data: TableRowInterface[]) => {
  data.forEach(row => {
    if (!!row.kids && Object.values(row.kids).length && !row.kids[Object.keys(row.kids)[0]].records.length) {
      row.kids = {};
    }
  });
};
