import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

  const {
    getToatalCartAmount,
    token,
    food_list,
    cartItems,
    url
  } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {

    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({
      ...data,
      [name]: value
    }));

  };

  const onSubmitHandler = async (event) => {

    event.preventDefault();

    let orderItems = [];

    food_list.forEach((item) => {

      if (cartItems[item._id] > 0) {

        let itemInfo = {
          name: item.name,
          price: item.price,
          quantity: cartItems[item._id]
        };

        orderItems.push(itemInfo);

      }

    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getToatalCartAmount() + (
        getToatalCartAmount() === 0 ? 0 : 2
      )
    };

    console.log("Order Data:", orderData);

    try {

      let response = await axios.post(
        url + "/api/order/place",
        orderData,
        {
          headers: {
            token: token
          }
        }
      );

      console.log("Response:", response.data);

      if (response.data.success) {

        console.log("Order ID:", response.data.orderId);

        window.location.href =
          "/verify?success=true&orderId=" + response.data.orderId;

      } else {

        alert(response.data.message);

      }

    } catch (error) {

      console.log("Order Error:", error);

      alert("Something went wrong");

    }

  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token){
      navigate('/cart')
    }
    else if(getToatalCartAmount()===0){
      navigate('/cart')
    }

  },[token])

  return (
    <form
      className='place-order'
      onSubmit={onSubmitHandler}
    >

      <div className="place-order-left">

        <p className="title">Delivery Information</p>

        <div className="mult-fields">

          <input
            type="text"
            name="firstName"
            placeholder="First name"
            onChange={onChangeHandler}
            value={data.firstName}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            onChange={onChangeHandler}
            value={data.lastName}
            required
          />

        </div>

        <input
          type="email"
          name="email"
          placeholder="Email address"
          onChange={onChangeHandler}
          value={data.email}
          required
        />

        <input
          type="text"
          name="street"
          placeholder="Street"
          onChange={onChangeHandler}
          value={data.street}
          required
        />

        <div className="mult-fields">

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={onChangeHandler}
            value={data.city}
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            onChange={onChangeHandler}
            value={data.state}
            required
          />

        </div>

        <div className="mult-fields">

          <input
            type="text"
            name="zipcode"
            placeholder="Zip code"
            onChange={onChangeHandler}
            value={data.zipcode}
            required
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            onChange={onChangeHandler}
            value={data.country}
            required
          />

        </div>

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={onChangeHandler}
          value={data.phone}
          required
        />

      </div>

      <div className="place-order-right">

        <div className="cart-total">

          <h2>Cart Totals</h2>

          <div>

            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getToatalCartAmount()}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>

              <p>
                {getToatalCartAmount() === 0 ? 0 : 2}
              </p>

            </div>

            <hr />

            <div className="cart-total-details">

              <b>Total</b>

              <b>
                {getToatalCartAmount() === 0
                  ? 0
                  : getToatalCartAmount() + 2}
              </b>

            </div>

          </div>

          <button type="submit">
            PROCEED TO PAYMENT
          </button>

        </div>

      </div>

    </form>
  );
};

export default PlaceOrder;