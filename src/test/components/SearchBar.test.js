import React from 'react';
import { shallow, configure } from 'enzyme';
import Fuse from 'fuse.js';
import Adapter from 'enzyme-adapter-react-16';
import SearchBar from '../../components/SearchBar';
import { data } from '../../../data/data.js';

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

describe('SearchBar component', () => {
  let SearchBarComponent;

  beforeEach(() => {
    const props = {
      fuse: new Fuse(data, options),
      setResult: jest.fn(),
    };
    SearchBarComponent = shallow(<SearchBar {...props} />);
  });

  it('should render SearchBar component', () => {
    expect(SearchBarComponent).toMatchSnapshot();
  });

  it('should render AutuSuggest component', () => {
    const autoSuggest = SearchBarComponent.find('Autosuggest');
    expect(autoSuggest.exists()).toBeTruthy();
  });
});
