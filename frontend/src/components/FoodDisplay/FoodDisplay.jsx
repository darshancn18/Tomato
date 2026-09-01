import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {

    const { food_list } = useContext(StoreContext)

    const filteredFoods = food_list.filter((item) => {

        if (category === "All") {
            return true
        }

        return item.category?.trim().toLowerCase() ===
            category?.trim().toLowerCase()
    })

    return (
        <div className='food-display' id='food-display'>

            <h2>Top dishes near you</h2>

            <div className="food-display-list">

                {filteredFoods.map((item, index) => (
                    <FoodItem
                        key={item._id || index}
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        description={item.description}
                        image={item.image}
                    />
                ))}

            </div>

        </div>
    )
}

export default FoodDisplay