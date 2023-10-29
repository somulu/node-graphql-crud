import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddUserModal from '../components/AddUserModal';

// Mocking Apollo client and queries/mutations is usually necessary.

test('renders the Add User modal button', () => {
  render(<AddUserModal />);
  const button = screen.getByRole('button', { name: /Add User/i });
  expect(button).toBeInTheDocument();
});

// test('displays the modal when the button is clicked', () => {
//   render(<AddUserModal />);
//   const button = screen.getByRole('button', { name: /Add User/i });
//   fireEvent.click(button);
//   const modal = screen.getByTestId('addUserModal');
//   expect(modal).toBeInTheDocument();
// });

// test('submitting the form calls the onSubmit function', () => {
//   const onSubmitMock = jest.fn();
//   render(<AddUserModal />);
//   const button = screen.getByRole('button', { name: /Add User/i });
//   fireEvent.click(button);

//   const submitButton = screen.getByRole('button', { name: /Submit/i });

//   // Fill out form fields (you can use screen.getByLabelText)
//   const firstNameInput = screen.getByLabelText(/First Name/i);
//   const lastNameInput = screen.getByLabelText(/Last Name/i);
//   const emailInput = screen.getByLabelText(/Email/i);
//   const organizationInput = screen.getByLabelText(/Organization/i);
//   const phoneInput = screen.getByLabelText(/Phone/i);

//   fireEvent.change(firstNameInput, { target: { value: 'John' } });
//   fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
//   fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
//   fireEvent.change(organizationInput, { target: { value: 'Company' } });
//   fireEvent.change(phoneInput, { target: { value: '1234567890' } });

//   fireEvent.click(submitButton);

//   // Check if onSubmit function is called with the expected values
//   expect(onSubmitMock).toHaveBeenCalledWith(expect.any(Object));
// });
