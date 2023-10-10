// const userResolvers = require('../graphql/graphqlResolvers'); // Replace with the correct path to your resolver
// const UserSchema = require('../models/UserModels'); // Replace with the correct path to your User model

// // Create a mock for the findById method of the User model
// jest.mock('../models/UserModels', () => ({
//   findById: jest.fn(),
// }));

// describe('GraphQL Resolvers', () => {
//   it('should return a user by ID', async () => {
//     // Define the mock user data
//     const mockUserData = {
//       id: '1',
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'john.doe@example.com',
//       organizationName: 'Sample Org',
//       contactNumber: '1234567890',
//     };

//     // Set up the mock for findById to resolve with mockUserData
//     UserSchema.findById.mockResolvedValue(mockUserData);

//     // Execute the resolver function
//     const result = await userResolvers.getUser({ id: '1' });

//     // Check the result
//     expect(result).toEqual(mockUserData);
//   });



//   // Add more test cases for error handling, edge cases, etc.
// });

const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const UserSchema = require('../models/UserModels');
const graphqlResolvers = require('../graphql/graphqlResolvers'); // adjust the import path as needed

describe('graphqlResolvers', () => {
  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      // Mock the UserSchema.find method to return a sample array of users
      const sampleUsers = [{ name: 'User 1' }, { name: 'User 2' }];
      sinon.stub(UserSchema, 'find').resolves(sampleUsers);

      const result = await graphqlResolvers.getUsers();

      // Ensure that the result is an array and contains the sample users
      expect(result).to.be.an('array');
      expect(result).to.deep.equal(sampleUsers);

      // Restore the stub after the test
      UserSchema.find.restore();
    });

    it('should handle errors and throw an error', async () => {
      // Mock UserSchema.find to throw an error
      const error = new Error('Test error');
      sinon.stub(UserSchema, 'find').rejects(error);

      try {
        await graphqlResolvers.getUsers();
        // If the function does not throw an error, the test should fail
        throw new Error('Test case should have thrown an error');
      } catch (err) {
        // Ensure that the error message matches the expected message
        expect(err.message).to.equal('Error in getting the all users');
      }

      // Restore the stub after the test
      UserSchema.find.restore();
    });
  });

  describe('getUserByID', () => {
    it('should return a user when provided with a valid ID', async () => {
      // Mock UserSchema.findById to return a sample user
      const sampleUser = { _id: '1', name: 'Sample User' };
      const findByIdStub = sinon.stub(UserSchema, 'findById').resolves(sampleUser);

      const result = await graphqlResolvers.getUser({ id: '1' });

      // Ensure that the result is an object and matches the sample user
      expect(result).to.be.an('object');
      expect(result).to.deep.equal(sampleUser);

      // Verify that UserSchema.findById was called with the correct ID
      expect(findByIdStub.calledOnceWith('1')).to.be.true;

      // Restore the stub after the test
      findByIdStub.restore();
    });

    it('should handle errors and throw an error when provided with an invalid ID', async () => {
      // Mock UserSchema.findById to throw an error
      const error = new Error('Test error');
      const findByIdStub = sinon.stub(UserSchema, 'findById').rejects(error);

      try {
        await graphqlResolvers.getUser({ id: 'invalid_id' });
        // If the function does not throw an error, the test should fail
        throw new Error('Test case should have thrown an error');
      } catch (err) {
        // Ensure that the error message matches the expected message
        expect(err.message).to.equal('Error in getting the user for the ID invalid_id');
      }

      // Verify that UserSchema.findById was called with the correct ID
      expect(findByIdStub.calledOnceWith('invalid_id')).to.be.true;

      // Restore the stub after the test
      findByIdStub.restore();
    });
  });
});

