import React, {Component} from 'react';
import './App.css';
import data from './static/data/products.json'
import './style.scss'
import cartImage from './static/bag-icon.png'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartProducts: data.products.map((p)=> ({id: p.id, qty: 0})),
            totalQty: 0
        };
    }

    addProduct = (p) => {
        let state = this.state
        let prod = state.cartProducts.find((pd)=> pd.id === p.id)
        prod.qty = prod.qty+1
        state.totalQty += 1
        this.setState(state)
    }

    removeFromCart = (id) => {
        let state = this.state
        let prod = state.cartProducts.find((cp) => cp.id === id)
        state.totalQty -= prod.qty
        prod.qty = 0
        this.setState(state)
    }

    render() {
        return (
            <div className="App">
                <ProductList products={data.products} addProduct={this.addProduct}/>
                <FloatCart cartProducts={this.state.cartProducts} products={data.products} totalQty={this.state.totalQty} removeFromCart={this.removeFromCart}/>
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
        this.setState({isOpen: true});
    };

    closeFloatCart = () => {
        this.setState({isOpen: false});
    };

    render() {
        const { cartProducts, products, totalQty, removeFromCart } = this.props;
        let totalPrice = 0
        let productList = []
        cartProducts.forEach((cp)=> {
            let prod = products.find((p)=>p.id === cp.id)
            totalPrice += cp.qty * prod.price
            if (cp.qty > 0) {
                productList.push(<CartProduct product={prod} qty={cp.qty} removeFromCart={removeFromCart}/>)
            }
        })


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
                    <div>
                    <img
                        onClick={() => this.openFloatCart()}
                        src={cartImage}
                        className="float-cart-closed"
                    />
                        <div className="float-cart-closed-quantity">{totalQty}</div>
                    </div>
                )}

                <div className="float-cart__content">
                    <div className="float-cart__header">
                        <span className="header-title">Cart</span>
                    </div>

                    <div className="float-cart__shelf-container">
                        {productList}
                        {(totalQty === 0) && (
                            <p className="shelf-empty">
                                Add some products in the cart <br/>
                                :)
                            </p>
                        )}
                    </div>

                    <div className="float-cart__footer">
                        <div className="sub">SUBTOTAL</div>
                        <div className="sub-price">
                            <p className="sub-price__val">
                                ${totalPrice}
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
        const { product, qty, removeFromCart } = this.props

        const classes = ['shelf-item'];

        return (
            <div className={classes.join(' ')}>
                <div className="shelf-item__del" onClick={() => removeFromCart(product.id)}>x</div>
                <img
                    classes="shelf-item__thumb"
                    src={require(`./static/data/products/${product.sku}_2.jpg`)}
                    alt={product.title}
                />
                <div className="shelf-item__details">
                    <p className="title">{product.title}</p>
                    <p className="desc">
                        {`${product.availableSizes[0]} | ${product.style}`} <br/>
                        Quantity: {qty}
                    </p>
                </div>
                <div className="shelf-item__price">
                    <p>{`${product.currencyFormat}  ${product.price}`}</p>
                </div>
            </div>
        );
    }
}

export default App;
