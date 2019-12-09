const graphql = require('graphql');
const _ = require('lodash');
var { user } = require("../models/UserSchema")
var { owner } = require("../models/OwnerSchema")
var { restaurant } = require("../models/RestaurantSchema")
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        address: { type: GraphQLString },
        phoneNo: { type: GraphQLString },
        profilePic: { type: GraphQLString }
    })
})
const RestaurantType = new GraphQLObjectType({
    name: 'restaurant',
    fields: () => ({
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        cuisine: { type: GraphQLString },
        phoneNo: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        image: { type: GraphQLString }
    })
})

const OwnerType = new GraphQLObjectType({
    name: 'owner',
    fields: () => ({
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        restaurant: { type: RestaurantType }
    })
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { email: { type: GraphQLString } },
            resolve(parent, args) {
                let gbUser = user.findOne({ email: args.email })
                return gbUser
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                let gbUsers = user.find({});
                return gbUsers
            }
        },
        owner: {
            type: OwnerType,
            args: { email: { type: GraphQLString } },
            resolve(parent, args) {
                let gbOwner = owner.findOne({ email: args.email })
                return gbOwner
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args) {
                let hashPassword = bcrypt.hashSync(args.password, saltRounds);
                console.log(hashPassword.length);
                var newUser = new user({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: hashPassword,
                    phoneNo: "",
                    address: "",
                    profilePic: ""
                });
                var result = newUser.save(function (err, user) {
                    if (err) return err;
                });
                return result;
            }
        },

        addOwner: {
            type: OwnerType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                restaurantName: { type: GraphQLString },
                zipcode: { type: GraphQLString }

            },
            resolve(parent, args) {
                let hashPassword = bcrypt.hashSync(args.password, saltRounds);
                console.log(hashPassword.length);
                var newRestaurant = new restaurant({
                    name: args.restaurantName,
                    address: "",
                    phoneNo: "",
                    cuisine: "",
                    zipcode: args.zipcode,
                    image: ""
                });
                var newOwner = new owner({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: hashPassword,
                    restaurant: newRestaurant
                });
                var result = newOwner.save(function (err, user) {
                    if (err) return err;
                });
                return result;
            }
        },

        updateUserName: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let useru = await user.findOneAndUpdate({ email: args.email }, { firstName: args.firstName, lastName: args.lastName }, { new: true })
                return useru;
            }
        },

        updateUserEmail: {
            type: UserType,
            args: {
                newEmail: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            resolve(parent, args) {
                return user.findOneAndUpdate({ email: args.email }, { email: args.newEmail }, { new: true })
            }
        },
        updateUserPassword: {
            type: UserType,
            args: {
                password: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            resolve(parent, args) {
                let hashPassword = bcrypt.hashSync(args.password, saltRounds);
                user.findOneAndUpdate({ email: args.email }, { password: hashPassword }, (err, rows) => {
                    if (err) return err;
                    else return rows;
                })
            }
        },
        updateOwnerName: {
            type: OwnerType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let useru = await owner.findOneAndUpdate({ email: args.email }, { firstName: args.firstName, lastName: args.lastName }, { new: true })
                return useru;
            }
        },

        updateOwnerEmail: {
            type: OwnerType,
            args: {
                newEmail: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            resolve(parent, args) {
                return owner.findOneAndUpdate({ email: args.email }, { email: args.newEmail }, { new: true })
            }
        },
        updateOwnerPassword: {
            type: OwnerType,
            args: {
                password: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            resolve(parent, args) {
                let hashPassword = bcrypt.hashSync(args.password, saltRounds);
                return owner.findOneAndUpdate({ email: args.email }, { password: hashPassword }, { new: true })
            }
        },
        updateOwnerRestaurant: {
            type: OwnerType,
            args: {
                email: { type: GraphQLString },
                name: { type: GraphQLString },
                cuisine: { type: GraphQLString },
                address: { type: GraphQLString },
                phoneNo: { type: GraphQLString },
                zipcode: { type: GraphQLString }
            },
            resolve(parent, args) {
                var newRestaurant = new restaurant({
                    name: args.name,
                    address: args.address,
                    phoneNo: args.phoneNo,
                    cuisine: args.cuisine,
                    zipcode: args.zipcode,
                    image: ""
                });
                return owner.findOneAndUpdate({ email: args.email }, { restaurant: newRestaurant }, { new: true })
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});