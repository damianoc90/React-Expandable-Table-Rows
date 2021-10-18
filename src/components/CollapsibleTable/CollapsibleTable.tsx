import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { TableRowInterface } from '../../models/table-row.interface';
import Row from '../Row/Row';
import './CollapsibleTable.scss';

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f1f1f1',
  }
}));

const CollapsibleTable: React.FC<Props> = ({ tableData, deleteRow }) => {
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
                <Row key={row._id} row={row} deleteRow={deleteRow} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        : <h3 className="CollapsibleTable__no-rows">No Rows</h3>
      }
    </React.Fragment>
  );
};

type Props = {
  tableData: TableRowInterface[],
  deleteRow: (id: string) => void
};

export default CollapsibleTable;
