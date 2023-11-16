const meRouter = require('./me');
const productRouter = require('./products');
const siteRouter = require('./site');
const cartRouter = require('./cart'); 
 


function route(app) {

    app.use('/me', meRouter);
    app.use('/products', productRouter);
    app.use('/', siteRouter);
    app.use('/cart', cartRouter);

        }
module.exports = route;
