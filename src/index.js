import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

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
                product: () => ({
                    id: 1,
                    name: 'lorem ipsum dolor',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit..',
                    quantity: 20,
                    status: 'available'
                }),
                products: () => [
                    {
                        id: 1,
                        name: 'lorem ipsum dolor',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit..',
                        quantity: 20,
                        status: 'available'
                    },
                    {
                        id: 2,
                        name: 'lorem ipsum dolor',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit..',
                        quantity: 30,
                        status: 'available'
                    },
                    {
                        id: 3,
                        name: 'lorem ipsum dolor',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit..',
                        quantity: 40,
                        status: 'unavailable'
                    }
                ],
                category: () => ({
                    id: 1,
                    name: 'lorem ipsum dolor',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit..'
                }),
                categories: () => [
                    {
                        id: 1,
                        name: 'lorem ipsum dolor',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit..'
                    },
                    {
                        id: 2,
                        name: 'lorem ipsum dolor',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit..'
                    },
                    {
                        id: 3,
                        name: 'lorem ipsum dolor',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit..'
                    }
                ]
            }
        }
    })
})

const server = createServer(yoga)

server.listen(3000, () => {
    console.info('Server is running on http://localhost:3000/graphql')
})
