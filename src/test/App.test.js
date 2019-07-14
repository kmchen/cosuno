import React from 'react';
import { shallow, configure } from 'enzyme';
import Fuse from 'fuse.js';
import Adapter from 'enzyme-adapter-react-16';
import { AppComponent } from '../App';
import { data } from '../../data/data.js';

configure({ adapter: new Adapter() });

const options = {
  shouldSort: true,
  threshold: 0.0,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['name'],
};

describe('App component', () => {
  let appComponent;

  beforeEach(() => {
    const props = {
      data: data.company,
      fuse: new Fuse(data, options),
      selectedCompany: [],
      dispatch: jest.fn(),
    };
    appComponent = shallow(<AppComponent {...props} />);
  });

  it('should render App component', () => {
    expect(appComponent).toMatchSnapshot();
  });
});
