import axios from 'axios'
const url = `http://localhost:3001`;

export const Query = {
    user: async (parent, args, context, info) => {
        let user = (await axios.get(`${url}/users/${args.id}`)).data

        if (user.deleted_at == null) {
            return user
        }
    },
    users: async (parent, args, context, info) => {

        let id = args.id != null ? `id=${args.id}` : '';
        let username = args.username != null ? `username=${args.username}` : '';

        let sort = args.sort != null ? `_sort=${args.sort}` : '';
        let order = args.order != null ? `_order=${args.order}` : '';
        let page = args.page != null ? `_page=${args.page}` : '';
        let limit = args.limit != null ? `_limit=${args.limit}` : '';

        return (await axios.get(`${url}/users?${id}&${username}&${sort}&${order}&${page}&${limit}`)).data.filter(user => user.deleted_at == null)
    },

    product: async (parent, args, context, info) => {
        let product = (await axios.get(`${url}/products/${args.id}`)).data

        if (product.deleted_at == null) {
            return product
        }
    },
    products: async (parent, args, context, info) => {

        let id = args.id != null ? `id=${args.id}` : '';
        let status = args.status != null ? `status=${args.status}` : '';

        let sort = args.sort != null ? `_sort=${args.sort}` : '';
        let order = args.order != null ? `_order=${args.order}` : '';
        let page = args.page != null ? `_page=${args.page}` : '';
        let limit = args.limit != null ? `_limit=${args.limit}` : '';

        return (await axios.get(`${url}/products?${id}&${status}&${sort}&${order}&${page}&${limit}`)).data.filter(product => product.deleted_at == null)
    },

    category: async (parent, args, context, info) => {
        let category = (await axios.get(`${url}/categories/${args.id}`)).data

        if (category.deleted_at == null) {
            return category
        }
    },
    categories: async (parent, args, context, info) => {

        let id = args.id != null ? `id=${args.id}` : '';
        let name = args.name != null ? `name=${args.name}` : '';

        let sort = args.sort != null ? `_sort=${args.sort}` : '';
        let order = args.order != null ? `_order=${args.order}` : '';
        let page = args.page != null ? `_page=${args.page}` : '';
        let limit = args.limit != null ? `_limit=${args.limit}` : '';

        return (await axios.get(`${url}/categories?${id}&${name}&${sort}&${order}&${page}&${limit}`)).data.filter(category => category.deleted_at == null)
    },

    image: async (parent, args, context, info) => {
        let image = (await axios.get(`${url}/images/${args.id}`)).data

        if (image.deleted_at == null) {
            return image
        }
    },
    images: async (parent, args, context, info) => {
        
        let id = args.id != null ? `id=${args.id}` : '';

        let sort = args.sort != null ? `_sort=${args.sort}` : '';
        let order = args.order != null ? `_order=${args.order}` : '';
        let page = args.page != null ? `_page=${args.page}` : '';
        let limit = args.limit != null ? `_limit=${args.limit}` : '';

        return (await axios.get(`${url}/images?${id}&${sort}&${order}&${page}&${limit}`)).data.filter(image => image.deleted_at == null)
    }
}

export const Mutation = {
    createUser: async (parent, args, context, info) => {
        let data = {
            name: args.name,
            username: args.username,
            email: args.email,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_at: null
        }

        return (await axios.post(`${url}/users`, data)).data
    },
    updateUser: async (parent, args, context, info) => {
        let user = (await axios.get(`${url}/users/${args.id}`)).data;

        let data = {
            name: args.name != undefined ? args.name : user.name,
            username: args.username != undefined ? args.username : user.username,
            email: args.email != undefined ? args.email : user.email,
            updated_at: new Date().toISOString()
        }

        return (await axios.put(`${url}/users/${user.id}`, data)).data
    },
    deleteUser: async (parent, args, context, info) => {
        let user = (await axios.get(`${url}/users/${args.id}`)).data;
        user.deleted_at = new Date().toISOString()
        let res = (await axios.put(`${url}/users/${args.id}`, user)).data

        if (res.deleted_at != null) { // no content
            return true;
        }

        return false;
    },

    createProduct: async (parent, args, context, info) => {
        // we can get userId from token
        // find all images and delete them
        let data = {
            name: args.name,
            description: args.description,
            price: args.price,
            quantity: args.quantity,
            status: args.status,
            category: 1,
            user: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_at: null
        }

        return (await axios.post(`${url}/products`, data)).data
    },
    updateProduct: async (parent, args, context, info) => {
        let product = (await axios.get(`${url}/products/${args.id}`)).data;

        let data = {
            name: args.name != undefined ? args.name : product.name,
            description: args.description != undefined ? args.description : product.description,
            price: args.price != undefined ? args.price : product.price,
            quantity: args.quantity != undefined ? args.quantity : product.quantity,
            status: args.status != undefined ? args.status : product.status,
            category: product.category,
            product: product.product,
            updated_at: new Date().toISOString()
        }

        return (await axios.put(`${url}/products/${product.id}`, data)).data
    },
    deleteProduct: async (parent, args, context, info) => {
        let product = (await axios.get(`${url}/products/${args.id}`)).data
        product.deleted_at = new Date().toISOString()
        let res = (await axios.put(`${url}/products/${args.id}`, product)).data

        if (res.deleted_at != null) { // no content
            return true
        }

        return false
    }
}

export const User = {
    products: async (parent, args, context, info) => (await axios.get(`${url}/products?user=${parent.id}`)).data
}

export const Product = {
    user: async (parent, args, context, info) => {
        try {
            return (await axios.get(`${url}/users/${parent.user}`)).data
        } catch (e) {
            return null
        }
    },
    // whenever i go to products, fire category fct
    category: async (parent, args, context, info) => (await axios.get(`${url}/categories/${parent.category}`)).data,
    images: async (parent, args, context, info) => (await axios.get(`${url}/images?product=${parent.id}`)).data
}

export const Category = {
    products: async (parent, args, context, info) => (await axios.get(`${url}/products?category=${parent.id}`)).data
}

export const Image = {
    product: async (parent, args, context, info) => {
        try {
            return (await axios.get(`${url}/products/${parent.product}`)).data
        } catch (e) {
            return null
        }
    }
}
