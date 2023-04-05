import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

const yoga = createYoga({
    schema: createSchema({
        typeDefs: /* GraphQL */ `
            type Query {
                id: ID!,
                name: String!
                description: String!
                quantity: Int
                status: String!
            }
        `,
        resolvers: {
            Query: {
                id: () => 1,
                name: () => 'lorem ipsum dolor',
                description: () => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit.',
                quantity: () => 20,
                status: () => 'available',
            }
        }
    })
})

const server = createServer(yoga)

server.listen(3000, () => {
    console.info('Server is running on http://localhost:3000/graphql')
})
