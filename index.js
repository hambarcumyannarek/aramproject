const express = require('express');
const fs = require('fs/promises');
const cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser());
app.use((req, res, next) => {
    if (!req.cookies.userID) {
        res.cookie('userID', Math.random() + '_' + Date.now() + '_' + Math.random(), { httpOnly: true, secure: true });
    }
    next();
})

app.set('view engine', 'views');
app.use(express.static('public'))
app.use('/gallery', express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let buyProducts = [];
app.get('/', async (req, res) => {
    const products = await fs.readFile('products.json', 'utf-8');
    console.log(req.cookies.userID);
    res.render('index.ejs', { products: JSON.parse(products), buyProducts })
})


app.get('/buy', (req, res) => {
    console.log(buyProducts)
    res.send(buyProducts.filter(product => product.userID === req.cookies.userID).reverse());
})
app.post('/buy/:id', async (req, res) => {
    const productsString = await fs.readFile('products.json', 'utf-8');
    const productsObj = JSON.parse(productsString);

    const findProduct = productsObj.find(product => product.id === +req.params.id);
    if (!findProduct) {
        return res.send({});
    }
    if (!buyProducts.find(card => card.id === +req.params.id && card.userID === req.cookies.userID)) {
        findProduct.userID = req.cookies.userID;
        findProduct.buyCount = 1;
        buyProducts.push(findProduct);
        return res.send({ value: true });
    }
    return res.send({});
})

app.put('/buy/:id', (req, res) => {
    buyProducts.map(card => {
        if (card.id === +req.params.id && card.userID === req.cookies.userID) {
            card.buyCount = req.body.newCount;
        }
    })
    res.send();
})

app.delete('/buy/:id', (req, res) => {
    buyProducts = buyProducts.filter(card => {
        if (!(card.id === +req.params.id && card.userID === req.cookies.userID)) {
            return card;
        }
    })
    res.send(buyProducts.filter(product => product.userID === req.cookies.userID));
})


app.get('/gallery/:id', async (req, res) => {
    const productsString = await fs.readFile('products.json', 'utf-8');
    const productsObj = JSON.parse(productsString);

    let product = productsObj.find(product => product.id === +req.params.id)
    console.log(product)
    res.render('gallery.ejs', {
        product,
        buyProducts: buyProducts.filter(product => product.userID === req.cookies.userID)
    })
})


const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`localhost:${port}`)
})