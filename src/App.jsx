// Компонент - строительный блок, который используется для разделения масштабного кода,
// далее компонент должен быть подключен в index.js, чтобы быть отображенным в html

// JSX - html+js

// Функциональный компонент - функция, которая возвращает html

// class --> className

import './App.css'
import Up from './images/up.png'
import Down from './images/down.png'
import Cheese from './images/cheese.png'
import Meat from './images/meat.png'
import Tomato from './images/tomato.png'
import Salad from './images/salad.png'
import { useState, useEffect } from 'react'
import { Cart } from './Cart'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// function App() {

// }

// let state = [state, function]
// state[0], state[1]
// Деструктуризация массива
// [element1, element2] = state
// const [состояние, обновить состояние] = useState(начальное состояние)

// Событие клика
// аттрибут onClick={function}
// onClick={() => function(arguments)}

const App = () => {

    const [hamburger, setHamburger] = useState([])
    const [price, setPrice] = useState(20)
    const [cart, setCart] = useState([])
    const [active, setActive] = useState(false)

    const template = /(order)/
    const localStorageItems = Object.keys(localStorage).filter((key) => {
        return key.match(template)
    })
    
    useEffect(() => {
        const orders = localStorageItems.map((order) => {
            return JSON.parse(localStorage[order])
        })

        if (orders) {
            setCart(orders)
        }

    }, [])

    function addUnit(unit) {
        setHamburger([... hamburger, { id: hamburger.length, ...unit }])
        setPrice((prevState) => {
            return prevState + unit.price
        })
    }

    function removeUnit(id, price) {
        setHamburger(hamburger.filter((unit) => {
            return unit.id !== id
        }))
        setPrice((prevState) => {
            return prevState - price
        })
    }

    function addToCart(item) {
        setCart([...cart, { id: cart.length, total: price, units: [...item] }])
        localStorage.setItem(`order${cart.length}`, JSON.stringify({ id: cart.length, total: price, units: [...item] }))
        setHamburger([])
        setPrice(20)

        toast.success("Burger has been added to cart!", {
            position: "top-right",
            autoClose: 5000,
        })
    }

    let hamburgerButtons = [
        { text: 'Cheese', img: Cheese, price: 50 },
        { text: 'Meat', img: Meat, price: 100 },
        { text: 'Tomato', img: Tomato, price: 25 },
        { text: 'Salad', img: Salad, price: 25 }
    ]

    return (
        <section className='app'>
            <div className="container">
                <div className="app__price">
                    <h2>{ price } som</h2>
                </div>
                <div className="app__block">
                    <div className="app__hamburger">
                        <img src={ Up } alt="up" />
                        {
                            hamburger.map((unit, index) => {
                                return <img key={ index } onClick={() => removeUnit(unit.id, unit.price)} src={ unit.img } alt={ unit.text } />
                            })
                        }
                        <img src={ Down } alt="down" />
                    </div>
                    <div className="app__buttons">
                        <h2>Add Ingredient</h2>
                        {
                            hamburgerButtons.map((button, index) => {
                                return <button key={ index } onClick={ () => addUnit(button) }>{ button.text }</button>
                            })
                        }
                        <div className="app__cart">
                            <button onClick={ () => addToCart(hamburger) }>Add to Cart</button>
                            <button onClick={ () => setActive(!active) }>
                                <span className='material-icons'>shopping_cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            {
                active ? <Cart setActive={ setActive } /> : null
            }
        </section>
    )
}

export default App

// export App --> import { App }
// export default App --> import App

// array.map((element, index, array) => {})

// array.map(() => {
//     return <htmlElement key={}></htmlElement>
// })

// localStorage.setItem(name: String, value)

// useEffect(() => {}, [])
// [] --> сработает только 1 раз, когда открывается приложение
// [states, server calls] --> будет работать каждый раз, когда переданные значения в массив обновляются