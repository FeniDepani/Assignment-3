const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const fs=require('fs');
const productDatabase = [];

const resolvers = {
  Query: {
    productList,
  },
  Mutation: {
    productAdd,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
});

function productList() { 
  return productDatabase;
}

function productAdd(_, { product }) {
  product.id = productDatabase.length + 1;
  productDatabase.push(product);
  return product;
}

const app = express();
app.use(express.static('public'));
server.applyMiddleware({app, path: '/graphql'});
app.listen(3000, function () {
	console.log('App started on port 3000');
});