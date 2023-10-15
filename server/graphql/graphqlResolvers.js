const UserSchema = require("../models/UserModels");

const graphqlResolvers = {
  getUser: async ({ id }, context) => {
    const {req, res} = context
    console.log("====== Req ", req.headers)
    try {
      const user = await UserSchema.findById(id);
      return user;
    } catch (error) {
      console.log(" Get User Error ", error);
      throw new Error(`Error in getting the user for the ID ${id}`);
    }
  },

  getUsers: async () => {
    try {
      const users = await UserSchema.find();
      return users;
    } catch (error) {
      console.log(" Get All Users Error ", error);
      throw new Error(`Error in getting the all users`);
    }
  },

  createUser: async ({
    firstName,
    lastName,
    email,
    organizationName,
    contactNumber,
  }) => {
    try {
      const user = new UserSchema({
        firstName,
        lastName,
        email,
        organizationName,
        contactNumber,
      });
      await user.save();
      return user;
    } catch (err) {
      throw new Error("Error in creating the user");
    }
  },

  updateUser: async ({
    id,
    firstName,
    lastName,
    email,
    organizationName,
    contactNumber,
  }) => {
    try {
      const user = await UserSchema.findByIdAndUpdate(
        id,
        { firstName, lastName, email, organizationName, contactNumber },
        { new: true }
      );
      return user;
    } catch (err) {
      console.log("==== Error ", err)
      throw new Error("Error in updating the user");
    }
  },

  deleteUser: async ({ id }) => {
    try {
      const user = await UserSchema.findByIdAndRemove(id);
      return user;
    } catch (err) {
      throw new Error("Error in deleting the user");
    }
  },
};

module.exports = graphqlResolvers;
