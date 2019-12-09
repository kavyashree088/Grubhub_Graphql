import { gql } from 'apollo-boost';

const getUsersQuery = gql`
    {
        users {
            firstName
            lastName
            email
            password
        }
    }
`;

const getUserQuery = gql`
  query user($email: String)  {
        user(email:$email) {
            firstName
            lastName
            email
            password
        }
    }
`;

const getOwnerQuery = gql`
  query owner($email: String)  {
        owner(email:$email) {
            firstName
            lastName
            email
            password
            restaurant {
                name
                cuisine
                address
                phoneNo
                zipcode
            }
        }
    }
`;

export { getUsersQuery, getUserQuery, getOwnerQuery };