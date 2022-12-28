const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getSingleUser: async (parent, {username}) => {
            const userData = await User.findOne({username})
                .select('-__v -password')
                .populate('hoursWorked')
            if (!userData) {
              const userDataEmail = await User.findOne({email: username})
                .select('-__v -password')
                .populate('hoursWorked')
              return userDataEmail
            }
            return userData;
          },
          getAllUsers: async () => {
            const userArray = await User.find({})
                .select('-__v -password')
                .populate('hoursWorked')
            return userArray;
          },
          me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('hoursWorked')
              return userData;
            }
            throw new AuthenticationError('Not logged In');
          },
    },
    Mutation: {
        createUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);
          return { token, user };
        },
        login: async (parent, { username, password}) => {
          let user = await User.findOne({ username });
          
          if (!user) {
              user = await User.findOne({ email: username })
              if(!user) {
                throw new AuthenticationError('Incorrect Credentials');
              }
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect Credentials');
          }
          const token = signToken(user);
          return { token, user };
        },
        clockIn: async (parent, args, context) => {
          if (context.user) {
            var updatedUser = await User.findOneAndUpdate(
              {_id: context.user._id },
              { 
                clockedIn: true,
                $push: {
                  hoursWorked: {
                    clockedInTime: args.clockedInTime,
                    payAmount: args.dbSalary,
                    forDate: new Date(parseInt(args.clockedInTime)).toLocaleDateString()
                  },
                },
              },
              {new: true}
            )
            .select('-__v -password')
            updatedUser = await User.findOneAndUpdate(
              {_id: context.user._id },
              {
                currentHWId: updatedUser.hoursWorked[updatedUser.hoursWorked.length - 1]._id.toString()
              },
              {new: true}
            )
            return updatedUser;
          }
          throw new AuthenticationError('You must be Logged In')
        },
        clockOut: async (parent, args, context) => {
          if (context.user) {
            var updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id},
              { clockedIn: false,
                currentHWId: 'none'},
              {new: true}
            )
            .select('-__v -password')
            
            updatedUser = await User.findOneAndUpdate(
              {_id: context.user._id, "hoursWorked._id": args.clockedId},
              {
                  "hoursWorked.$.clockedOutTime": args.clockedOutTime
              },
              {new: true}
              )
              .select('-__v -password')

            return updatedUser;
          }

          throw new AuthenticationError('You must be Logged In')
        },
        addSalary: async (parent, args, context) => {
          if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              {_id: context.user._id},
              { payAmount: args.salary},
              {new: true}
            )
            .select('-__v -password')
            .populate('hoursWorked')

            return updatedUser;
          }
          throw new AuthenticationError('You must be Logged In')
        },
        deleteWorkHours: async (parent, args, context) => {
          if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              {_id: context.user._id},
              {
                $pull: {
                  hoursWorked: {_id: args.refId}
                }
              },
              { new: true}
            )
            .select('-__v -password')

            return updatedUser;
          }
          throw new AuthenticationError("You must be logged in")
        },
        deleteHWHistory: async (parent, args, context) => {
          if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              {_id: context.user._id},
              {
                clockedIn: false,
                $set:{
                  hoursWorked: []
                },
                currentHWId: 'none'
              },
              { new: true}
            )
            .select('-__v -password')

            return updatedUser;
          }
          throw new AuthenticationError("You must be logged in")
        }
    }
};

module.exports = resolvers