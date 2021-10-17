import { TableRow } from '@mui/material';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';
import { TableRowInterface } from '../../models/table-row.interface';
import Row, { StyledCell } from './Row';

afterEach(() => {
  cleanup();
});

fdescribe('Row', () => {
  const mockedData: TableRowInterface = {
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

  const deleteRow = ((id: string) => { });

  let container, row, cells, cellLength;

  beforeEach(() => {
    container = shallow(<Row row={mockedData} deleteRow={deleteRow} />);
    row = container.find(TableRow);
    cells = row.find(StyledCell);
    cellLength = Object.keys(mockedData.data).length + 2;
  });

  test('should render Row component', () => {
    expect(container.find(Row)).toBeTruthy();
  });

  test('should render correctly the number of cells based on provided data', () => {
    expect(cells).toHaveLength(cellLength);
  });

  test('should render correctly provided data on each cell', () => {
    const rowValues = Object.values(mockedData.data);
    cells.forEach((cell, index: number) => {
      if (index !== 0 && index !== cellLength - 1) {
        expect(cell.text()).toEqual(rowValues[index - 1]);
      }
    });
  });
});
