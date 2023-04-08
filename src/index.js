import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
import axios from 'axios'

let url = 'http://localhost:3001';

const yoga = createYoga({
    schema: createSchema({
        typeDefs: /* GraphQL */ `
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

            type User {
                id: ID!
                name: String!
                username: String!
                email: String!
                products: [Product!]
            }

            type Product {
                id: ID!,
                name: String!
                description: String!
                price: Int!
                quantity: Int
                status: String!
                user: User!
                category: Category
                images: [Image!]
            }

            type Category {
                id: ID!,
                name: String!
                description: String!
                products: [Product!]
            }

            type Image {
                id: ID!
                path: String!
                user: User!
                product: Product!
            }
        `,
        resolvers: {
            Query: {
                user: async (parent, args, context, info) => (await axios.get(`${url}/users/${args.id}`)).data,
                users: async (parent, args, context, info) => {

                    let id = args.id != null ? `id=${args.id}` : '';
                    let username = args.username != null ? `username=${args.username}` : '';

                    let sort = args.sort != null ? `_sort=${args.sort}` : '';
                    let order = args.order != null ? `_order=${args.order}` : '';
                    let page = args.page != null ? `_page=${args.page}` : '';
                    let limit = args.limit != null ? `_limit=${args.limit}` : '';

                    return (await axios.get(`${url}/users?${id}&${username}&${sort}&${order}&${page}&${limit}`)).data
                },

                product: async (parent, args, context, info) => (await axios.get(`${url}/products/${args.id}`)).data,
                products: async (parent, args, context, info) => {

                    let id = args.id != null ? `id=${args.id}` : '';
                    let status = args.status != null ? `status=${args.status}` : '';

                    let sort = args.sort != null ? `_sort=${args.sort}` : '';
                    let order = args.order != null ? `_order=${args.order}` : '';
                    let page = args.page != null ? `_page=${args.page}` : '';
                    let limit = args.limit != null ? `_limit=${args.limit}` : '';

                    return (await axios.get(`${url}/products?${id}&${status}&${sort}&${order}&${page}&${limit}`)).data
                },

                category: async (parent, args, context, info) => (await axios.get(`${url}/categories/${args.id}`)).data,
                categories: async (parent, args, context, info) => {

                    let id = args.id != null ? `id=${args.id}` : '';
                    let name = args.name != null ? `name=${args.name}` : '';

                    let sort = args.sort != null ? `_sort=${args.sort}` : '';
                    let order = args.order != null ? `_order=${args.order}` : '';
                    let page = args.page != null ? `_page=${args.page}` : '';
                    let limit = args.limit != null ? `_limit=${args.limit}` : '';

                    return (await axios.get(`${url}/categories?${id}&${name}&${sort}&${order}&${page}&${limit}`)).data
                },

                image: async (parent, args, context, info) => (await axios.get(`${url}/images/${args.id}`)).data,
                images: async (parent, args, context, info) => {
                    
                    let id = args.id != null ? `id=${args.id}` : '';

                    let sort = args.sort != null ? `_sort=${args.sort}` : '';
                    let order = args.order != null ? `_order=${args.order}` : '';
                    let page = args.page != null ? `_page=${args.page}` : '';
                    let limit = args.limit != null ? `_limit=${args.limit}` : '';

                    return (await axios.get(`${url}/images?${id}&${sort}&${order}&${page}&${limit}`)).data
                },
            },
            Product: {
                // whenever i go to products, fire category fct
                category: async (parent, args, context, info) => (await axios.get(`${url}/categories/${parent.category}`)).data,
                user: async (parent, args, context, info) => (await axios.get(`${url}/users/${parent.user}`)).data,
                images: async (parent, args, context, info) => (await axios.get(`${url}/images?product=${parent.id}`)).data
            },
            Category: {
                products: async (parent, args, context, info) => (await axios.get(`${url}/products?category=${parent.id}`)).data
            },
            User: {
                products: async (parent, args, context, info) => (await axios.get(`${url}/products?user=${parent.id}`)).data
            }
        }
    })
})

const server = createServer(yoga)

server.listen(3000, () => {
    console.info('Server is running on http://localhost:3000/graphql')
})
