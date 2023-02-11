import { render, screen } from '@testing-library/react';
import App from './App';
import { store } from './redux/redux';
import { Provider } from 'react-redux';

test('renders title', () => {
  render(<Provider store={store}><App /></Provider>);
  const linkElement = screen.getByText("That's Cheesy");
  expect(linkElement).toBeInTheDocument();
});
