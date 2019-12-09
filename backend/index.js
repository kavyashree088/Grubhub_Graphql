const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose')
const cors = require('cors');
var bodyParser = require("body-parser");
const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://root:root@clusterkc-cr6mm.mongodb.net/grubhub?retryWrites=true&w=majority', { useNewUrlParser: true, poolSize: 10 }, function (err) {
    if (err) throw err;
    else {
        console.log('Successfully connected to MongoDB');
    }
});


app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

const login = require("./routes/login")

app.use("/", login)


app.listen(8080, () => {
    console.log("GraphQL server started on port 8080");
})