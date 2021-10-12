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
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CollapsibleTable from '../CollapsibleTable/CollapsibleTable';
import './Row.scss';

const StyledCell = styled(TableCell)(() => ({
  backgroundColor: '#ffffff'
}));

const Row = ({ row, deleteRow }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = () => Object.keys(row.kids).length > 0 && row.kids[Object.keys(row.kids)[0]].records.length > 0;

  return (
    <React.Fragment>
      <TableRow>
        <StyledCell>
          {
            hasChildren() &&
            <IconButton
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
            size="small"
            onClick={() => deleteRow(row._id)}>
            <CloseIcon />
          </IconButton>
        </StyledCell>
      </TableRow>
      {
        open && hasChildren() &&
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

Row.propTypes = {
  row: PropTypes.object,
  deleteRow: PropTypes.func
};

export default Row;
