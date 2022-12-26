const { gql } = require('apollo-server-express')

const typeDefs = gql`
type WorkingHoursT {
    clockedInTime: String
    clockedOutTime: String
    forDate: String
}

type User {
    _id: ID
    username: String
    email: String
    clockedIn: Boolean
    payAmount: String
    hoursWorked: [WorkingHoursT]
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
    clockIn(clockedInTime: String, forDate: String): User
    clockOut(clockedId: String, clockedOutTime: String)
}
`;

module.exports = typeDefs