import React from 'react';
import { render, waitFor, screen, queryByClassName } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Users from '../components/Users';
import { GET_USERS } from '../graphql/userQueries';


test('renders error message when there is an error', async () => {
  const errorMock = {
    request: {
      query: GET_USERS,
    },
    error: new Error('An error occurred'),
  };

  render(
    <MockedProvider mocks={[errorMock]}>
      <Users />
    </MockedProvider>
  );

  const errorMessage = await screen.findByText('Error: An error occurred');
  expect(errorMessage).toBeInTheDocument();
});


