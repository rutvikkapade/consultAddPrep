var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language

let name="rutvik";
var customObject = {
    "name": "rutvik",
    "age" : 18
}

var schema = buildSchema(`
type customObject {
    name: String
    age: Int
  }

  type Query {
    hello: String
    customObject: customObject,
  }

  type Mutation {
    modifyName(name: String!): String
  }
  
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  customObject : ()=>{
      return customObject;
  },
  modifyName : (args)=>{
      name = args.name;
      return name;
  }
};


var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');