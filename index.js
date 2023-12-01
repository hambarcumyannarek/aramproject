const express = require('express');
const fs = require('fs/promises');

const app = express();

app.set('view engine', 'views');
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
    buyProducts = [];
    const products = await fs.readFile('products.json', 'utf-8');
    res.render('index.ejs', {products: JSON.parse(products)})
})

let buyProducts = [];

app.get('/buy', (req, res) => {
    console.log(buyProducts)
    res.send(buyProducts);
})
app.post('/buy/:id', async (req, res) => {
    const productsString = await fs.readFile('products.json', 'utf-8');
    const productsObj = JSON.parse(productsString);

    const findProduct = productsObj.find(product => product.id === +req.params.id);
    if(!findProduct) {
        return res.send();
    }
    if(!buyProducts.find(card => card.id === +req.params.id)) {
        findProduct.buyCount = 1;
        buyProducts.push(findProduct);
        return res.send();
    }
    return res.send();
})

app.put('/buy/:id', (req, res) => {
    buyProducts.map(card => {
        if(card.id === +req.params.id) {
            card.buyCount = req.body.newCount;
        }
    })
})

app.delete('/buy/:id', (req, res) => {
    buyProducts = buyProducts.filter(card => {
        if(card.id !== +req.params.id) {
            return card;
        }
    })
    res.send(buyProducts);
})


const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`localhost:${port}`)
})