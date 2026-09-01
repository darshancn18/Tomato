import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {

  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);

  const navigate = useNavigate();

  const verifyPayment = async () => {

    try {

      console.log("Success:", success);
      console.log("Order ID:", orderId);

      const response = await axios.post(
        url + "/api/order/verify",
        {
          success: success,
          orderId: orderId
        }
      );

      console.log("Verify Response:", response.data);

      if (response.data.success) {

        console.log("Payment verified!");

        navigate("/");

      } else {

        console.log("Payment verification failed");

        navigate("/");

      }

    } catch (error) {

      console.log("Verify Error:", error);

      navigate("/");

    }

  };

  useEffect(() => {

    verifyPayment();

  }, []);

  return (
    <div className="verify">

      <div className="spinner"></div>

    </div>
  );
};

export default Verify;