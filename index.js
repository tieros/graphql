const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const { authors, books } = require('./data');
// title'a ! koyduğumda bu null olamaz demek (non-nullable)

const typeDefs = gql`
    type Book {
        id: ID!
        title: String!
        author: Author
        author_id: String!
        score: Float
        isPublished: Boolean
    }

    type Author {
        id: ID!
        name: String!
        surname: String!
        age: Int
        books: [Book!]
    }
    type Query {
        books: [Book!]
        authors: [Author!]
        author(id: ID): Author!
        hello: String
        book(id: ID): Book!
    }
`;

// datayı dönecek fonksiyonu yazıyoruz:

const resolvers = {
    Query: {
        books: () => books,
        authors: () => authors,
        author: (args) => authors.find((author) => author.id === args.id),
        hello: () => 'world',
        book: (args) => books.find((book) => book.id === args.id),
    },
    Book: {
        author: (parent) => authors.find((author) => author.id === parent.author_id),
    },
    Author: {
        books: (parent) => books.filter((book) => book.author_id === parent.id),
    },
};

// server'ı ayağa kaldırmak için Apollo Server iki param istiyor
// biri type definitionlar, biri de resolver (yani fonksyion)
// plugin sadece Playround'da görüntüleyebilmek için ekstra kurduğumuz bir şey
// apollo'nun kendi studio'su var aslında o kullanılacak artık

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => console.log('GraphQl server is up at ' + url));
