import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './App.css';
import data from './static/data/products.json'
import './style.scss'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartProducts: []
        };
    }

    addProduct = (p) => {
        let cartP = this.state.cartProducts.slice(0)
        cartP.push(p)
        this.setState({cartProducts: cartP})
    }

    render() {
        console.log(this.state)
         return (
            <div className="App">
                <ProductList products={data.products} addProduct={this.addProduct}/>
                <FloatCart cartProducts={this.state.cartProducts}/>
            </div>
        );
    }
}

class ProductDetails extends Component {
    render() {
        const product = this.props.product
        const price = product.currencyFormat + product.price
        return (
            <div>
                <div>{product.title}</div>
                <div>{price}</div>
            </div>
        )
    }
}

class ProductItem extends Component {
    render() {
        const product = this.props.product
        return (
            <div
                className="product-item"
                onClick={() => this.props.addProduct(product)}
            >
                <div>
                    <img src={require(`./static/data/products/${product.sku}_1.jpg`)} alt={product.title}
                         title={product.title}/>
                </div>
                <ProductDetails product={product}/>
                <div className="shelf-item__buy-btn">Add to cart</div>
            </div>
        )
    }
}

class ProductList extends Component {
    render() {
        const products = this.props.products
        const p = products.map(p =>
            <ProductItem product={p} addProduct={this.props.addProduct}/>
        )
        return (
            <div className="product-list">
                {p}
            </div>
        )
    }
}

class FloatCart extends Component {

    state = {
        isOpen: false
    };

    openFloatCart = () => {
        this.setState({ isOpen: true });
    };

    closeFloatCart = () => {
        this.setState({ isOpen: false });
    };

    render() {
        const cartProducts = this.props.cartProducts;
        let totalprice = 0
        const products = cartProducts.map(p => {
            totalprice += p.price
            return (
                <CartProduct product={p} key={p.id} />
            );
        });


        let classes = ['float-cart'];

        if (!!this.state.isOpen) {
            classes.push('float-cart--open');
        }

        return (
            <div className={classes.join(' ')}>
                {/* If cart open, show close (x) button */}
                {this.state.isOpen && (
                    <div
                        onClick={() => this.closeFloatCart()}
                        className="float-cart__close-btn"
                    >
                        X
                    </div>
                )}

                {/* If cart is closed, show bag with quantity of product and open cart action */}
                {!this.state.isOpen && (
                    <span
                        onClick={() => this.openFloatCart()}
                        className="bag bag--float-cart-closed"
                    >
          </span>
                )}

                <div className="float-cart__content">
                    <div className="float-cart__header">
                        <span className="header-title">Cart</span>
                    </div>

                    <div className="float-cart__shelf-container">
                        {products}
                        {!products.length && (
                            <p className="shelf-empty">
                                Add some products in the cart <br />
                                :)
                            </p>
                        )}
                    </div>

                    <div className="float-cart__footer">
                        <div className="sub">SUBTOTAL</div>
                        <div className="sub-price">
                            <p className="sub-price__val">
                                ${totalprice}
                            </p>
                            <small className="sub-price__installment">

                            </small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class CartProduct extends Component {
    render() {
        const product = this.props.product;

        const classes = ['shelf-item'];

        return (
            <div className={classes.join(' ')}>
                <img
                    classes="shelf-item__thumb"
                    src={require(`./static/data/products/${product.sku}_2.jpg`)}
                    alt={product.title}
                />
                <div className="shelf-item__details">
                    <p className="title">{product.title}</p>
                    <p className="desc">
                        {`${product.availableSizes[0]} | ${product.style}`} <br />
                        Quantity: {product.quantity}
                    </p>
                </div>
                <div className="shelf-item__price">
                    <p>{`${product.currencyFormat}  ${product.price}`}</p>
                </div>

                <div className="clearfix" />
            </div>
        );
    }
}

export default App;
