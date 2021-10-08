import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import React from 'react';
import Row from '../Row/Row';
import './CollapsibleTable.scss';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f1f1f1',
  }
}));

const CollapsibleTable = ({ tableData, deleteRow }) => {
  const getColumns = () => tableData && tableData.length
    ? Object.keys(tableData[0].data)
    : [];

  return (
    <React.Fragment>
      {tableData.length
        ? <TableContainer component="div">
          <Table size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell />
                {
                  getColumns().map((column, index) => (
                    <StyledTableCell key={index} sx={{ fontWeight: 'bold' }}>{column}</StyledTableCell>
                  ))
                }
                <StyledTableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <Row key={index} row={row} deleteRow={deleteRow} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        : <h3 className="CollapsibleTable__no-rows">No Rows</h3>
      }
    </React.Fragment>
  );
};

CollapsibleTable.propTypes = {
  tableData: PropTypes.array,
  deleteRow: PropTypes.func
};

export default CollapsibleTable;