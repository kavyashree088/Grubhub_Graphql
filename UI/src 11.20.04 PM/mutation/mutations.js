
import { gql } from 'apollo-boost';

const addBookMutation = gql`
    mutation AddBook($name: String, $genre: String, $authorId: ID){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;

const addUserMutation = gql`
    mutation AddUser($firstName: String, $lastName: String, $email: String, $password: String){
        addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password){
            firstName
            lastName
            email
        }
    }
`;

const addOwnerMutation = gql`
    mutation AddOwner($firstName: String, $lastName: String, $email: String, $password: String, $restaurantName: String, $zipcode: String){
        addOwner(firstName: $firstName, lastName: $lastName, email: $email, password: $password, restaurantName: $restaurantName, zipcode:$zipcode){
            firstName
            lastName
            email
        }
    }
`;

const updateUserNameMutation = gql`
    mutation UpdateUserName($firstName: String, $lastName: String, $email: String){
        updateUserName(firstName: $firstName, lastName: $lastName, email: $email){
            firstName
            lastName
            email
            password
        }
    }
`;

const updateUserEmailMutation = gql`
    mutation UpdateEmailName( $newEmail: String, $email: String){
        updateUserEmail(newEmail: $newEmail, email: $email){
            firstName
            lastName
            email
            password
        }
    }
`;

const updateUserPasswordMutation = gql`
    mutation UpdateUserPassword($password: String, $email: String){
        updateUserPassword(password: $password, email: $email){
            firstName
            lastName
            email
            password
        }
    }
`;

const updateOwnerNameMutation = gql`
    mutation UpdateOwnerrName($firstName: String, $lastName: String, $email: String){
        updateOwnerName(firstName: $firstName, lastName: $lastName, email: $email){
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

const updateOwnerEmailMutation = gql`
    mutation UpdateOwnerEmail( $newEmail: String, $email: String){
        updateOwnerEmail(newEmail: $newEmail, email: $email){
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

const updateOwnerPasswordMutation = gql`
    mutation UpdateOwnerPassword($password: String, $email: String){
        updateOwnerPassword(password: $password, email: $email){
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

const updateOwnerRestaurantMutation = gql`
    mutation UpdateOwnerRestaurant($email: String, $name: String, $cuisine: String, $address: String, $phoneNo: String, $zipcode: String){
        updateOwnerRestaurant(email: $email, name: $name, cuisine: $cuisine, address: $address, phoneNo: $phoneNo, zipcode: $zipcode ){
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
export {
    addBookMutation, addUserMutation, addOwnerMutation, updateUserNameMutation,
    updateUserEmailMutation, updateUserPasswordMutation, updateOwnerEmailMutation,
    updateOwnerNameMutation, updateOwnerPasswordMutation, updateOwnerRestaurantMutation
};