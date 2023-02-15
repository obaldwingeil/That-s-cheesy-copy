import { render, screen, within } from '@testing-library/react';
import Home from '../containers/Home';
import { MemoryRouter } from 'react-router-dom';

const mockedLink = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    Link: () => mockedLink
}));

test('renders title', () => {
  const user_id = '63c89100b1cd9206c4989fb8';
  const { container } = render(
    <MemoryRouter>
        <Home user_id={user_id} />
    </MemoryRouter>
  );
  const linkElement = screen.getByText("That's Cheesy");
  expect(linkElement).toBeInTheDocument();
});

test('renders Add Recipe Button', () => {
    const user_id = 'no user';
    const { container } = render(
        <MemoryRouter>
            <Home user_id={user_id} />
        </MemoryRouter>
    );
    const buttonContainer = container.getElementsByClassName("add-btn");
    expect(buttonContainer.length).toBe(1);
});

/*
test('renders My Saved Recipes: add recipes link when there is no user', () => {
    const user_id = 'no user';
    
});

test('renders My Saved Recipes: list when user is logged in', () => {

}); */
