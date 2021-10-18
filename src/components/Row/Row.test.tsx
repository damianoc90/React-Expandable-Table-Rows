import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { TableRow } from '@mui/material';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';
import React from 'react';
import { TableRowInterface } from '../../models/table-row.interface';
import CollapsibleTable from '../CollapsibleTable/CollapsibleTable';
import Row, { StyledCell } from './Row';

const mockedDataWithChild: TableRowInterface = {
  _id: '123',
  data: {
    'Identification number': '35',
    'Name': 'Jason',
    'Gender': 'm',
    'Risk': 'BITES',
    'Hair length': '1.6000000000',
    'IQ': '91',
    'Admission date': 'Mon Feb 17 00:00:00 CET 1997',
    'Last breakdown': 'Wed Dec 03 03:09:55 CET 2014',
    'Yearly fee': '67932',
    'Knows the Joker?': 'false'
  },
  kids: {
    'has_relatives': {
      'records': [
        {
          _id: '1234',
          'data': {
            'Relative ID': '116',
            'Patient ID': '86',
            'Is alive?': 'true',
            'Frequency of visits': '35'
          },
          'kids': {}
        }
      ]
    }
  }
};
const deleteRow = jest.fn();

let container, tableRow, cells, cellLength, open;

beforeEach(() => {
  container = shallow(<Row row={mockedDataWithChild} deleteRow={deleteRow} />);
  tableRow = container.find(TableRow);
  cells = tableRow.find(StyledCell);
  cellLength = Object.keys(mockedDataWithChild.data).length + 2;

  const setOpen = jest.fn();
  open = false;
  jest.spyOn(React, 'useState').mockImplementation(() => [open, setOpen]);
});

afterEach(() => {
  cleanup();
});

describe('Row', () => {
  test('should render Row component', () => {
    expect(tableRow).toBeTruthy();
    expect(container.find(Row)).toBeTruthy();
  });


  test('should call deleteRow function (with _id param) when user click the delete icon', () => {
    const deleteButton = container.find(`[data-test="delete-icon"]`);
    deleteButton.simulate('click');
    expect(deleteRow).toBeCalledTimes(1);
    expect(deleteRow).toBeCalledWith(mockedDataWithChild._id);
  });
});

describe('Row: with child', () => {
  test('should render correctly the number of cells based on provided data', () => {
    expect(cells).toHaveLength(cellLength);
  });

  test('should render correctly provided data on each cell', () => {
    const rowValues = Object.values(mockedDataWithChild.data);
    cells.forEach((cell, index: number) => {
      if (index !== 0 && index !== cellLength - 1) {
        expect(cell.text()).toEqual(rowValues[index - 1]);
      }
    });
  });

  test('should display row expander button', () => {
    const expanderButton = container.find(`[data-test="toggle-row-icon"]`);
    expect(expanderButton).toBeTruthy();
  });

  test('should display KeyboardArrowDownIcon if open is true', () => {
    open = true;
    const expanderButton = container.find(`[data-test="toggle-row-icon"]`);
    expect(expanderButton).toBeTruthy();
    expect(expanderButton.find(KeyboardArrowDownIcon)).toBeTruthy();
  });

  test('should display KeyboardArrowRightIcon if open is false', () => {
    open = false;
    const expanderButton = container.find(`[data-test="toggle-row-icon"]`);
    expect(expanderButton).toBeTruthy();
    expect(expanderButton.find(KeyboardArrowRightIcon)).toBeTruthy();
  });

  test('should display table for children', () => {
    const childTable = container.find(CollapsibleTable);
    expect(childTable).toBeTruthy();
  });
});

describe('Row: without child', () => {
  const mockedDataWithoutChild: TableRowInterface = {
    _id: '123',
    data: {
      'Identification number': '35',
      'Name': 'Jason',
      'Gender': 'm',
      'Risk': 'BITES',
      'Hair length': '1.6000000000',
      'IQ': '91',
      'Admission date': 'Mon Feb 17 00:00:00 CET 1997',
      'Last breakdown': 'Wed Dec 03 03:09:55 CET 2014',
      'Yearly fee': '67932',
      'Knows the Joker?': 'false'
    },
    kids: {}
  };

  beforeEach(() => {
    container = shallow(<Row row={mockedDataWithoutChild} deleteRow={deleteRow} />);
  });

  test('should not display row expander icon', () => {
    const openButton = container.find(`[data-test="toggle-row-icon"]`);
    expect(openButton).toHaveLength(0);
  });

  test('should not display table for children', () => {
    const childTable = container.find(CollapsibleTable);
    expect(childTable).toHaveLength(0);
  });
});