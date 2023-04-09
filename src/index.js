import { Query, Mutation, User, Product, Category, Image } from '../resolvers/index';
import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

const yoga = createYoga({
    schema: createSchema({
        typeDefs: /* GraphQL */ `
            scalar DateTime

            type Query {
                user(id: ID!): User!
                users(id: ID, username: String, sort: String, order: String, page: Int, limit: Int): [User!]!

                product(id: ID!): Product!
                products(id: ID, status: String, sort: String, order: String, page: Int, limit: Int): [Product!]!
                
                category(id: ID!): Category!
                categories(id: ID, name: String, sort: String, order: String, page: Int, limit: Int): [Category!]!

                image(id: ID!): Image!
                images(id: ID, sort: String, order: String, page: Int, limit: Int): [Image!]!
            }

            type Mutation {
                createUser(name: String!, username: String!, email: String!): User!
                createProduct(name: String!, description: String!, price: Float!, quantity: Int! , status: String!): Product!

                updateUser(id: ID!, name: String, username: String, email: String): User!
                updateProduct(id: ID!, name: String, description: String, price: Float, quantity: Int, status: String): Product!

                deleteUser(id: ID!): Boolean!
                deleteProduct(id: ID!): Boolean!
            }

            type User {
                id: ID!
                name: String!
                username: String!
                email: String!
                products: [Product!]
                created_at: DateTime
                updated_at: DateTime
                deleted_at: DateTime
            }

            type Product {
                id: ID!,
                name: String!
                description: String!
                price: Float!
                quantity: Int
                status: String!
                user: User
                category: Category
                images: [Image!]
                created_at: DateTime
                updated_at: DateTime
                deleted_at: DateTime
            }

            type Category {
                id: ID!,
                name: String!
                description: String!
                products: [Product!]
                created_at: DateTime
                updated_at: DateTime
                deleted_at: DateTime
            }

            type Image {
                id: ID!
                path: String!
                product: Product
                created_at: DateTime
                updated_at: DateTime
                deleted_at: DateTime
            }
        `,
        resolvers: {
            Query,
            Mutation,
            Product,
            Category,
            User,
            Image
        }
    })
})

const server = createServer(yoga)

server.listen(3000, () => {
    console.info('Server is running on http://localhost:3000/graphql')
})
