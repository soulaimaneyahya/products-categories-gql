# Products-Categories-GQL

GraphQL & NodeJS application using Nodemon and Babel-node.


## Starting Project

### install requirements

1. install npm and start
```npm
npm install
```
```npm
npm start
```

2. starting json-server
```npm
json-server --watch data/db.json --port 3001
```

3. runing on browser
```
http://localhost:3000/graphql
```

### Filters

```
GET /products?id=1&status=unavailable
GET /products?id=1
GET /categories?name=smartphones
```

### Paginate

Use `_page` and optionally `_limit` to paginate returned data.

In the `Link` header you'll get `first`, `prev`, `next` and `last` links.


```
GET /categories?_page=7
GET /products?_page=7&_limit=20
```

_10 items are returned by default_

### Sort

Add `_sort` and `_order` (ascending order by default)

```
GET /categories?_sort=id&_order=asc
GET /products?_sort=price&_order=asc
```

---

Need helps? Reach me out

> Email: soulaimaneyh07@gmail.com

> Linkedin: soulaimane-yahya

All the best :beer:
