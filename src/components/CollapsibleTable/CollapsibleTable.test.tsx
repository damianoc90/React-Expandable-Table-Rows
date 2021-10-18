import { Table, TableBody, TableHead } from '@mui/material';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';
import { TableRowInterface } from '../../models/table-row.interface';
import Row from '../Row/Row';
import CollapsibleTable, { StyledTableCell } from './CollapsibleTable';

afterEach(() => {
  cleanup();
});

describe('CollapsibleTable: with data', () => {
  const mockedData: TableRowInterface[] = [{
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
  }];

  const deleteRow = ((id: string) => { });

  const container = shallow(<CollapsibleTable tableData={mockedData} deleteRow={deleteRow} />);

  test('should renders CollapsibleTable component', () => {
    expect(container.find(CollapsibleTable)).toBeTruthy();
  });

  test('should renders table based on provided data', () => {
    // There should be ONLY 1 table element
    const table = container.find(Table);
    expect(container.find(Table)).toHaveLength(1);

    // The table should have ONLY 1 thead element
    const thead = table.find(TableHead);
    expect(thead).toHaveLength(1);

    // The number of th tags should be equal to number of columns
    const headers = thead.find(StyledTableCell);
    const colLength = Object.keys(mockedData[0].data).length + 2;
    expect(headers).toHaveLength(colLength);

    // Each th tag text should equal to column header
    headers.forEach((th, index: number) => {
      if (index !== 0 && index !== colLength - 1) {
        expect(th.text()).toEqual(Object.keys(mockedData[0].data)[index - 1]);
      }
    });

    // The table should have ONLY 1 tbody tag
    const tbody = table.find(TableBody);
    expect(tbody).toHaveLength(1);

    // Tbody tag should have the same number of rows as data rows
    const rows = tbody.find(Row);
    const rowsLength = mockedData.length;
    expect(rows).toHaveLength(rowsLength);
  });
});

describe('CollapsibleTable: empty data', () => {
  const mockedData: TableRowInterface[] = [];
  const deleteRow = ((id: string) => { });

  const container = shallow(<CollapsibleTable tableData={mockedData} deleteRow={deleteRow} />);

  test('should renders empty text', () => {
    const noRowsText = container.find('.CollapsibleTable__no-rows');
    expect(noRowsText).toHaveLength(1);
  });
});
