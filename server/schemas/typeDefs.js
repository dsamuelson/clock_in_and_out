const { gql } = require('apollo-server-express')

const typeDefs = gql`
type WorkingHoursT {
    _id: ID
    clockedInTime: String
    clockedOutTime: String
    forDate: String
    payAmount: String
    workedTime: Float
    paidTime: Float
}

type User {
    _id: ID
    username: String
    email: String
    clockedIn: Boolean
    payAmount: String
    hoursWorked: [WorkingHoursT]
    currentHWId: String
    totalTime: Float
    totalPay: Float
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    getSingleUser(username: String!): User
    getAllUsers: [User]
    user: User
}
type Mutation {
    createUser(email: String!, username: String!, password: String!): Auth
    login(username: String! password: String!): Auth
    clockIn(clockedInTime: String!, dbSalary: String!): User
    clockOut(clockedId: String!, clockedOutTime: String!): User
    addSalary(salary: String!): User
    deleteWorkHours(refId: String!): User
    deleteHWHistory: User
}
`;

module.exports = typeDefs