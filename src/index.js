import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

const yoga = createYoga({
    schema: createSchema({
        typeDefs: /* GraphQL */ `
            type Query {
                greeting: String!
            }
        `,
        resolvers: {
            Query: {
                greeting: () => 'graphql developer'
            }
        }
    })
})

const server = createServer(yoga)

server.listen(3000, () => {
    console.info('Server is running on http://localhost:3000/graphql')
})
