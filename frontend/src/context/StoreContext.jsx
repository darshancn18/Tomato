import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    const url = "http://localhost:4000";

    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    // Add to cart
    const addToCart = async (itemId) => {

        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId]
                ? prev[itemId] + 1
                : 1
        }));

        if (token) {

            try {

                await axios.post(
                    url + "/api/cart/add",
                    { itemId },
                    {
                        headers: {
                            token: token
                        }
                    }
                );

            } catch (error) {

                console.log("ADD TO CART ERROR:", error);

            }
        }
    };


    // Remove from cart
    const removeFromCart = async (itemId) => {

        setCartItems((prev) => ({
            ...prev,
            [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
        }));

        if (token) {

            try {

                await axios.post(
                    url + "/api/cart/remove",
                    { itemId },
                    {
                        headers: {
                            token: token
                        }
                    }
                );

            } catch (error) {

                console.log("REMOVE FROM CART ERROR:", error);

            }
        }
    };


    // Get total cart amount
    const getToatalCartAmount = () => {

        let totalAmount = 0;

        for (const item in cartItems) {

            if (cartItems[item] > 0) {

                const itemInfo = food_list.find(
                    (product) => product._id === item
                );

                if (itemInfo) {
                    totalAmount +=
                        itemInfo.price * cartItems[item];
                }
            }
        }

        return totalAmount;
    };


    // Fetch food list
    const fetchFoodList = async () => {

        try {

            const response = await axios.get(
                url + "/api/food/list"
            );

            setFoodList(response.data.data);

        } catch (error) {

            console.log("FOOD LIST ERROR:", error);

        }
    };


    // Fetch user's cart
    const loadCartData = async (token) => {

        try {

            const response = await axios.post(
                url + "/api/cart/get",
                {},
                {
                    headers: {
                        token: token
                    }
                }
            );

            if (response.data.success) {
                setCartItems(response.data.cartData);
            }

        } catch (error) {

            console.log("CART DATA ERROR:", error);

        }
    };


    useEffect(() => {

        const loadData = async () => {

            await fetchFoodList();

            const savedToken = localStorage.getItem("token");

            if (savedToken) {

                setToken(savedToken);

                await loadCartData(savedToken);
            }
        };

        loadData();

    }, []);


    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getToatalCartAmount,
        url,
        token,
        setToken
    };


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;