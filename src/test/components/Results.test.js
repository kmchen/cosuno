import React from 'react';
import { shallow, configure } from 'enzyme';
import Fuse from 'fuse.js';
import Adapter from 'enzyme-adapter-react-16';
import Results from '../../components/Results';
import { data } from '../../../data/data.js';

configure({ adapter: new Adapter() });

describe('Results component', () => {
  let ResultsComponent;

  beforeEach(() => {
    const props = {
      selectedCompany: [{
        name:"AUTO1 Group",
        Logo: "https://source.unsplash.com/random",
        specialty: ["ecommerce", "software"],
        city: "Hamburg"
      }]
    };
    ResultsComponent = shallow(<Results {...props} />);
  });

  it('should render Results component', () => {
    expect(ResultsComponent).toMatchSnapshot();
  });

  it('should render Card component', () => {
    const cardComponent = ResultsComponent.find('WithStyles(ForwardRef(Card))');
    expect(cardComponent.exists()).toBeTruthy();
  });
});

