// TASK 2
const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

const products = []
const orders = []

app.get('/products', (req, res) => {
    res.send(products)
})

app.get('/products/:id', (req, res) => {
    const id = req.params.id
    const product = products.find(pr => pr.id == id)

    if (product) {
        return res.send(product)
    }
    res.status(404).send('Not found')
})

app.post('/products', (req, res) => {
    if (!req.body.name || !req.body.description || !req.body.price) {
        return res.status(400).send({ error: 'Please provide all required fields' })
    }
    const product = {
        id: products.length + 1,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    }
    products.push(product)
    res.send(products)
})

app.put('/products/:id', (req, res) => {
    const id = req.params.id
    const productIndex = products.findIndex(pr => pr.id == id)

    if (productIndex != -1) {
        const updatedProduct = { ...products[productIndex], ...req.body };
        products[productIndex] = updatedProduct;
        return res.send(products);
    }
    res.status(404).send('User not found');
})

app.delete('/products/:id', (req, res) => {
    const id = req.params.id
    const index = products.findIndex(pr => pr.id == id)
    if (id != -1) {
        products.splice(index, 1)
        return res.send(products)
    }
    res.status(404).send('Not Found')
})




app.get('/orders', (req, res) => {
    res.send(orders)
})

app.get('/orders/:id', (req, res) => {
    const id = req.params.id
    const order = orders.find(or => or.id == id)

    if (order) {
        return res.send(order)
    }
    res.status(404).send('Not found')
})

app.post('/orders', (req, res) => {
    const order = {
        id: orders.length + 1,
        ...req.body
    }
    orders.push(order)
    res.send(orders)
})

app.put('/orders/:id', (req, res) => {
    const id = req.params.id
    const orderIndex = orders.findIndex(or => or.id == id)

    if (orderIndex != -1) {
        const updatedOrder = { ...orders[orderIndex], ...req.body };
        orders[orderIndex] = updatedOrder;
        return res.send(orders);
    }
    res.status(404).send('User not found');
})

app.delete('/orders/:id', (req, res) => {
    const id = req.params.id
    const index = orders.findIndex(or => or.id == id)
    if (id != -1) {
        orders.splice(index, 1)
        return res.send(orders)
    }
    res.status(404).send('Not Found')
})



app.get('/orders/:id/items', (req, res) => {
    const id = req.params.id
    const order = orders.find(or => or.id == id)
    if(order) {
        if(order.items) {
            return res.send(order.items)
        }
    }
    res.status(404).send('Not Found')
})

app.post('/orders/:id/items', (req, res) => {
    const id = req.params.id
    const order = orders.find(or => or.id == id)
    order.items = {}

    if (order) {
        const item = {
            id: order.items.length + 1,
            ...req.body
        }
        order.items = item
        return res.send(orders)
    }
    res.status(404).send('Not Found!')
})


app.put('/orders/:id/status', (req, res) => {
    const id = req.params.id;
    const status= req.body.status;

    const order = orders.find(or => or.id == id);

    if (order) {
        order.status = status;
        return res.send(order);
    }
    res.status(404).send('Order not found');
});

app.listen(port)