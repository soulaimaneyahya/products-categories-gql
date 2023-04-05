import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
import axios from 'axios'

let url = 'http://localhost:3001';

const yoga = createYoga({
    schema: createSchema({
        typeDefs: /* GraphQL */ `
            type Query {
                product: Product!
                products: [Product!]!
                category: Category!
                categories: [Category!]!
            }

            type Product {
                id: ID!,
                name: String!
                description: String!
                price: Int!
                quantity: Int
                status: String!
            }

            type Category {
                id: ID!,
                name: String!
                description: String!
            }
        `,
        resolvers: {
            Query: {
                product: async () => (await axios.get(`${url}/products/1`)).data,
                products: async () => (await axios.get(`${url}/products`)).data,
                category: async () => (await axios.get(`${url}/categories/1`)).data,
                categories: async () => (await axios.get(`${url}/categories`)).data
            }
        }
    })
})

const server = createServer(yoga)

server.listen(3000, () => {
    console.info('Server is running on http://localhost:3000/graphql')
})
