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

// describe('createUser', () => {
//     it('should create a user when valid input is provided', async () => {
//       // Mock UserSchema's constructor and save method
//       const sampleUser = {
//         _id: '1',
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'johndoe@example.com',
//         organizationName: 'Example Org',
//         contactNumber: '1234567890',
//       };
//       const saveStub = sinon.stub(UserSchema.prototype, 'save').resolves(sampleUser);
//       const userArgs = {
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'johndoe@example.com',
//         organizationName: 'Example Org',
//         contactNumber: '1234567890',
//       };

//       const result = await graphqlResolvers.createUser(userArgs);

//       // Ensure that the result is an object and matches the sample user
//       expect(result).to.be.an('object');
//       expect(result).to.deep.equal(sampleUser);

//       // Verify that UserSchema's constructor was called with the correct arguments
//       expect(UserSchema.calledWithNew()).to.be.true;
//       expect(UserSchema.calledWith(userArgs)).to.be.true;

//       // Verify that the save method was called
//       expect(saveStub.calledOnce).to.be.true;

//       // Restore the stubs after the test
//       UserSchema.prototype.save.restore();
//     });

//     it('should handle errors and throw an error when input is missing', async () => {
//       // Mock UserSchema's constructor to throw an error
//       const error = new Error('Test error');
//       sinon.stub(UserSchema.prototype, 'save').rejects(error);

//       try {
//         await graphqlResolvers.createUser({});
//         // If the function does not throw an error, the test should fail
//         throw new Error('Test case should have thrown an error');
//       } catch (err) {
//         // Ensure that the error message matches the expected message
//         expect(err.message).to.equal('Error in creating the user');
//       }

//       // Restore the stubs after the test
//       UserSchema.prototype.save.restore();
//     });
//   });
  
});

// Mock the UserSchema and its methods
// jest.mock('../models/UserModels', () => {
//   const mockUserModel = {
//     save: jest.fn(),
//   };
//   return {
//     default: jest.fn(() => mockUserModel),
//   };
// });

// describe('graphqlResolvers', () => {
//   describe('createUser', () => {
//     it('should create and return a new user', async () => {
//       const UserSchema = require('../models/UserModels').default; // Import the mocked UserSchema
//       const args = {
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'johndoe@example.com',
//         organizationName: 'Sample Org',
//         contactNumber: '123-456-7890',
//       };

//       // Set up the mock to resolve with a sample user
//       UserSchema.prototype.save.mockResolvedValue({
//         _id: '1',
//         ...args,
//       });

//       const result = await graphqlResolvers.createUser(args);

//       // Ensure that the result is an object and matches the sample user
//       expect(result).toEqual({
//         _id: '1',
//         ...args,
//       });

//       // Verify that UserSchema.prototype.save was called with the correct arguments
//       expect(UserSchema.prototype.save).toHaveBeenCalledWith(args);
//     });

//     it('should handle errors and throw an error when unable to create a user', async () => {
//       const UserSchema = require('../models/UserModels').default; // Import the mocked UserSchema
//       const args = {
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'johndoe@example.com',
//         organizationName: 'Sample Org',
//         contactNumber: '123-456-7890',
//       };

//       // Set up the mock to reject with an error
//       const error = new Error('Test error');
//       UserSchema.prototype.save.mockRejectedValue(error);

//       try {
//         await graphqlResolvers.createUser(args);
//         // If the function does not throw an error, the test should fail
//         throw new Error('Test case should have thrown an error');
//       } catch (err) {
//         // Ensure that the error message matches the expected message
//         expect(err.message).toBe('Error in creating the user');
//       }

//       // Verify that UserSchema.prototype.save was called with the correct arguments
//       expect(UserSchema.prototype.save).toHaveBeenCalledWith(args);
//     });
//   });
// });

// jest.mock("../models/UserModels");

// describe("graphqlResolvers updateUser", () => {
//   it("should update a user and return the updated user", async () => {
//     // Arrange
//     const mockUpdatedUser = { id: "1", firstName: "Updated First Name", lastName: "Updated Last Name" };
//     UserSchema.findByIdAndUpdate.mockResolvedValue(mockUpdatedUser);

//     const input = {
//       id: "1",
//       firstName: "Updated First Name",
//       lastName: "Updated Last Name"
//     };

//     // Act
//     const result = await graphqlResolvers.updateUser(input);
//     expect(result).to.be.equal(mockUpdatedUser);

//     // Assert
//     // expect(UserSchema.findByIdAndUpdate).toHaveBeenCalledWith(
//     //   "1",
//     //   {
//     //     firstName: "Updated First Name",
//     //     lastName: "Updated Last Name",
//     //     email: "updateduser@example.com",
//     //     organizationName: "Updated Org",
//     //     contactNumber: "1234567890",
//     //   },
//     //   { new: true }
//     // );
//     // expect(result).toEqual(mockUpdatedUser);
//   });

//   it("should throw an error when updating a user fails", async () => {
//     // Arrange
//     // UserSchema.findByIdAndUpdate.mockRejectedValue(new Error("Database error"));

//     const input = {
//       id: "1sampleId",
//       firstName: "Updated",
//       lastName: "User",
//       email: "updateduser@example.com",
//       organizationName: "Updated Org",
//       contactNumber: "1234567890",
//     };

//     const result = await graphqlResolvers.updateUser(input);
//     // expect(result).to.be.equal("Error in updating the user");
//     // await expect(result).to.be.rejectedWith("Error in updating the user")
//     await expect(result).rejects.toThrow("Error in updating the user")
//     // await expect(graphqlResolvers.updateUser(input)).rejects.toMatch(
//     //     'Error in updating the user'
//     //   );

//     // Act and Assert
//     // await expect(graphqlResolvers.updateUser(input)).rejects.toThrow("Error in updating the user");
//   });
// });


