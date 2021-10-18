import { shallow } from 'enzyme';
import React from 'react';
import DataViewer from './DataViewer';

describe('DataViewer', () => {
  const container = shallow(<DataViewer />);

  test('should renders DataViewer component', () => {
    expect(container.find(DataViewer)).toBeTruthy();
  });
});
