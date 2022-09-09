import Up from './images/up.png'
import Down from './images/down.png'

export const Cart = ({ setActive }) => {
    const template = /(order)/
    const localStorageItems = Object.keys(localStorage).filter((key) => {
        return key.match(template)
    })

    const orders = localStorageItems.map((order) => {
        return JSON.parse(localStorage[order])
    })

    function countUnits(array, text) {
        let count = 0

        for (let i = 0; i < array.length; i++) {
            if (array[i].text === text) {
                count++
            }
        }

        console.log(count)
        return <span>{ count }</span>
    }

    function countTotal() {
        let total = 0

        for (let i = 0; i < orders.length; i++) {
            total += orders[i].total
        }

        return <span>{ total }</span>
    }

    function deleteFromCart(id) {
        localStorage.removeItem(`order${id}`)
        window.location.reload()
        
    }

    const items = orders.map(({ id, total, units }) => {
        return (
            <div key={ id } className="cart__item">
                <div className="cart__image">
                    <img src={ Up } alt="up" />
                        {
                            units.map((unit, index) => {
                                return <img key={ index } src={ unit.img } alt={ unit.text } />
                            })
                        }
                    <img src={ Down } alt="down" />
                </div>
                <ul className="cart__list">
                    <li>
                        Cheese - { countUnits(units, 'Cheese') }
                    </li>
                    <li>
                        Meat - { countUnits(units, 'Meat') }
                    </li>
                    <li>
                        Tomato - { countUnits(units, 'Tomato') }
                    </li>
                    <li>
                        Salad - { countUnits(units, 'Salad') }
                    </li>
                </ul>
                <p className='cart__price'>{ total } som</p>
                <button onClick={ () => deleteFromCart(id) } className='cart__delete'>
                    <span className="material-icons">delete</span>
                </button>
            </div>
        )
    })

    return (
        <section className="cart">
            <div className="container">
                <div className="cart__block">
                    <h2>
                        Cart
                        <button onClick={ () => setActive(false) }>
                            <span className="material-icons">close</span>
                        </button>
                    </h2>
                    {
                        orders.length === 0 ?
                        <h2>You have no orders!</h2> :
                        <div className="cart__orders">
                            { items }
                        </div>
                    }
                    {
                        orders.length > 0 ?
                        <p>
                            <p className='cart__total'>Total: { countTotal() }</p>
                        </p> :
                        null
                    }
                </div>
            </div>
        </section>
    )
}

// JSON.stringify() - object --> JSON object (строковый объект)
// JSON.parse() - JSON object --> object

// const Component = (props) => {
//     props.setActive()
// }

// const Component = (props) => {
//     const { setActive, ... } = props
// }

// const Component = ({ setActive }) => {
//     setActive()
// }

// array.map((object) => {
//     return object.id
// })

// array.map(({ id }) => {
//     return id
// })