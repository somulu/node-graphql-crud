const { graphql } = require('graphql');

// Import schema definition
const graphqlSchema = require('../graphql/graphqlSchema');

// Create a mock resolvers object if needed
const mockResolvers = {
  Query: {
    getUser: jest.fn(),
    getUsers: jest.fn(),
  },
  Mutation: {
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  },
};

describe('GraphQL Schema', () => {
  it('should return a user by ID', async () => {
    // Define a sample query
    const query = `
      {
        getUser(id: "652556b94503b1735d9bd547") {
          id
          firstName
          lastName
          email
          organizationName
          contactNumber
        }
      }
    `;

    // Provide a context object if needed (e.g., for authentication)
    const context = {};

    // Execute the query against the schema
    const response = await graphql(graphqlSchema, query, null, context);
    // Check the result
    expect(response).toBeDefined();
    expect(response.errors).toBeUndefined(); // Check for errors
    expect(response.data.getUser).toBeDefined();
    // expect(response.data.getUser.id).toBe('1');
  });

  it('should return all users', async () => {
    // Define a sample query
    const query = `
      {
        getUsers() {
          id
          firstName
          lastName
          email
          organizationName
          contactNumber
        }
      }
    `;

    // Provide a context object if needed (e.g., for authentication)
    const context = {};

    // Execute the query against the schema
    const response = await graphql(graphqlSchema, query, null, context);
    // Check the result
    expect(response).toBeDefined();
  });

  it('should create a new user', async () => {
    // Define the mutation query
    const mutation = `
      mutation {
        createUser(
          firstName: "John"
          lastName: "Doe"
          email: "john.doe@example.com"
          organizationName: "Sample Org"
          contactNumber: "1234567890"
        ) {
          id
          firstName
          lastName
          email
          organizationName
          contactNumber
        }
      }
    `;

    // Provide a context object if needed (e.g., for authentication)
    const context = {};

    // Execute the mutation against the schema
    const response = await graphql(graphqlSchema, mutation, null, context);

    // Check the result
    expect(response).toBeDefined();
    expect(response.errors).toBeUndefined(); // Check for errors
    expect(response.data.createUser).toBeDefined();
    // expect(response.data.createUser.firstName).toBe('John');
    // expect(response.data.createUser.lastName).toBe('Doe');
    // expect(response.data.createUser.email).toBe('john.doe@example.com');
    // expect(response.data.createUser.organizationName).toBe('Sample Org');
    // expect(response.data.createUser.contactNumber).toBe('1234567890');
  });

  it('should update an existing user', async () => {
    // Define the mutation query with specific input values
    const mutation = `
      mutation {
        updateUser(
          id: "1"
          firstName: "UpdatedFirstName"
          lastName: "UpdatedLastName"
          email: "updated.email@example.com"
          organizationName: "Updated Org"
          contactNumber: "9876543210"
        ) {
          id
          firstName
          lastName
          email
          organizationName
          contactNumber
        }
      }
    `;

    // Provide a context object if needed (e.g., for authentication)
    const context = {};

    // Execute the mutation against the schema
    const response = await graphql(graphqlSchema, mutation, null, context);

    // Check the result
    expect(response).toBeDefined();
    expect(response.errors).toBeUndefined(); // Check for errors
    expect(response.data.updateUser).toBeDefined();
    // expect(response.data.updateUser.id).toBe('652556b94503b1735d9bd547'); // Verify the user ID
    // expect(response.data.updateUser.firstName).toBe('UpdatedFirstName');
    // expect(response.data.updateUser.lastName).toBe('UpdatedLastName');
    // expect(response.data.updateUser.email).toBe('updated.email@example.com');
    // expect(response.data.updateUser.organizationName).toBe('Updated Org');
    // expect(response.data.updateUser.contactNumber).toBe('9876543210');
  });

  it('should delete an existing user by ID', async () => {
    // Define the mutation query with specific input values
    const mutation = `
      mutation {
        deleteUser( id: "652556b94503b1735d9bd547" ) {
          id
          firstName
          lastName
          email
          organizationName
          contactNumber
        }
      }
    `;

    // Provide a context object if needed (e.g., for authentication)
    const context = {};

    // Execute the mutation against the schema
    const response = await graphql(graphqlSchema, mutation, null, context);
    // Check the result
    expect(response).toBeDefined();
    expect(response.errors).toBeUndefined(); // Check for errors
    // expect(response.data.updateUser).toBeDefined();
    // expect(response.data.updateUser.id).toBe('652556b94503b1735d9bd547'); // Verify the user ID
    // expect(response.data.updateUser.firstName).toBe('UpdatedFirstName');
    // expect(response.data.updateUser.lastName).toBe('UpdatedLastName');
    // expect(response.data.updateUser.email).toBe('updated.email@example.com');
    // expect(response.data.updateUser.organizationName).toBe('Updated Org');
    // expect(response.data.updateUser.contactNumber).toBe('9876543210');
  });

});
