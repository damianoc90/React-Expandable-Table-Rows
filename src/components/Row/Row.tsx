import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { TableRowInterface } from '../../models/table-row.interface';
import CollapsibleTable from '../CollapsibleTable/CollapsibleTable';
import './Row.scss';

export const StyledCell = styled(TableCell)(() => ({
  backgroundColor: '#ffffff'
}));

const Row: React.FC<Props> = ({ row, deleteRow }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = () => Object.keys(row.kids).length > 0 && row.kids[Object.keys(row.kids)[0]].records.length > 0;

  useEffect(() => {
    setOpen(false);
  }, [row]);

  return (
    <React.Fragment>
      {
        row &&
        <TableRow>
          <StyledCell>
            {
              hasChildren() &&
              <IconButton
                data-test="toggle-row-icon"
                size="small"
                onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
              </IconButton>
            }
          </StyledCell>
          {
            Object.keys(row.data).map((key, index) =>
              <StyledCell key={index}>{row.data[key]}</StyledCell>
            )
          }
          <StyledCell>
            <IconButton
              data-test="delete-icon"
              size="small"
              onClick={() => deleteRow(row._id)}>
              <CloseIcon />
            </IconButton>
          </StyledCell>
        </TableRow>
      }
      {
        row && open && hasChildren() &&
        <TableRow>
          <StyledCell style={{ paddingBottom: 0, paddingTop: 0, borderBottom: 'none' }} colSpan={Object.keys(row.data).length + 2}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 2 }}>
                <Typography variant="subtitle1" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                  {Object.keys(row.kids)[0].toUpperCase()}
                </Typography>
                <CollapsibleTable tableData={Object.values(row.kids)[0].records} deleteRow={deleteRow} />
              </Box>
            </Collapse>
          </StyledCell>
        </TableRow>
      }
    </React.Fragment>
  );
};

type Props = {
  row: TableRowInterface,
  deleteRow: (id: string) => void
};

const shouldRenderComponent = ((prev: Props, next: Props) => {
  return prev.row.data._id !== next.row.data._id
    || prev.row.kids.length !== next.row.kids.length;
});

export default React.memo(Row, shouldRenderComponent);
