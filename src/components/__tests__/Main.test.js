import {render, screen, cleanup} from '@testing-library/react';
import renderer from 'react-test-renderer';
import Main from '../Main/Main';

afterEach(()=>{
  cleanup();
});

test('should render Main component', () => {
  const main = { pagination:1, numberOfSentences:'10', sentence:"i love learning code", score:0, markBlockComplete:false}
  render (<Main main={main}/>);
  const MainElement = screen.getByTestId('main-test');
  expect(MainElement).toBeInTheDocument();
  expect(MainElement).toHaveTextContent('Score')
});

test('matches snapshot',()=>{
  const main = { pagination:1, numberOfSentences:'10', sentence:"i love learning code", score:0, markBlockComplete:false}
  const tree = renderer.create(<Main main={main}/>).toJSON()
  expect(tree).toMatchSnapshot();
})
