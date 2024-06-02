import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PayAsYouLike() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    currency: "INR", //default currency
    amount: "",
  });
  const [totalContributions, setTotalContributions] = useState(1);
  const [contriInrUsd, setContriInrUsd] = useState("₹1 / $1");
  const [totalBudget, setTotalBudget] = useState(`₹2,10,00,000 / $1`);
  const [razorpayKey, setRazorpayKey] = useState("");

  const formatINR = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const formatUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    // Fetch Razorpay key from server
    axios
      .get("http://localhost:4000/razorpay/key")
      .then((response) => {
        setRazorpayKey(response.data.key);
      })
      .catch((error) => {
        console.error("Error fetching Razorpay key:", error);
      });

    // Fetch totalContributions from the json file

    fetch("http://localhost:4000/contribution")
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }
        return response.json();
      })
      .then((total) => {
        setTotalContributions(total);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  useEffect(() => {
    // Fetch USD/INR rate from API, update budget USD and contribution USD, all for an update on contribution chart
    fetch(
      "https://v6.exchangerate-api.com/v6/8754ac39dfd66aa10bf5b1c0/latest/USD"
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.result);
          });
        }
        return response.json();
      })
      .then((data) => {
        const contriINR = formatINR.format(totalContributions);
        const contriUSD = formatUSD.format(
          totalContributions / data.conversion_rates.INR
        );
        const budgetUSD = formatUSD.format(
          21000000 / data.conversion_rates.INR
        );
        setContriInrUsd(`${contriINR} / ${contriUSD}`);
        setTotalBudget(`₹2,10,00,000 / ${budgetUSD}`);
        updateContributionChart(totalContributions);
      })
      .catch((error) => {
        console.error(error.result);
      });
  }, [totalContributions]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUserInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function updateContributionChart(contributions) {
    // update the chart with contribution amount
  }

  async function handlePayment() {
    // Send order to Razorpay, verify payment, store payment, update contribution chart

    const orderUrl = "http://localhost:4000/razorpay/create-order";
    const { amount, currency } = userInfo;

    try {
      const order = await axios.post(orderUrl, {
        amount: amount * 100, //Amount in paise/cents
        currency: currency,
      });

      const options = {
        key: razorpayKey,
        amount: order.data.amount,
        currency: order.data.currency,
        name: "Empatheia Films",
        description: "Test Transaction",
        image: "",
        order_id: order.data.id,
        handler: async function (response) {
          const verifyUrl = "http://localhost:4000/razorpay/verify-payment";
          const paymentVerification = await axios.post(verifyUrl, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (paymentVerification.data.status === "success") {
            alert("Payment Successful!");
            console.log('I am here!')
            setTotalContributions((prevTotal) => prevTotal + parseInt(amount));
            // Send a POST call for updating contributionTotal.json as well.

            // Send payment details to server for storage
            await axios.post("http://localhost:4000/razorpay/payment-details", {
              userInfo,
              ...options,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
          } else {
            alert("Payment Verification Failed!");
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#F37254",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (userInfo.amount > 0) {
      handlePayment();
      //send a POST call to server to store just user info like password and all, generate a password, time, etc, and send it to their email.
    } else {
      //only do the sending a POST call to server to store user info like password and all, generate a password, time, etc, and send it to their email.
    }
    //Take acknowledgement (if amount <=0, then there is no acknowledgement and only take userInfo), AND userInfo and Fetch http://localhost:4000/paid with a POST.
    //POST userInfo, alongwith password, time, amount, etc into password.json. POST paid.json with userInfo.id (which is in password.json), and userInfo.email, and acknowledgement details.
    //If userInfo.email already exists, use the same ID and regenerate new password, time, add old amount with new amount, etc. Else, create a new id.
    //Send email with userInfo.password to userInfo.email.
    //RES with a "Thank you! Check your email for the password.".
  }

  return (
    <div className="payasyoulike">
      <div id="scroll-landing-payasyoulike" />
      <div>
        <h1 className="heading-thin">PAY-AS-</h1>{" "}
        <h1 className="heading-thick you-like-text">YOU-LIKE</h1>
        <hr className="underline-heading-payasyoulike" />
      </div>

      <p className="main-text">
        As fun as our film 'Fairy Folk' was to make, the challenges we faced as
        a truly independent production ranged from testing to downright
        crippling. But we somehow made it through, only to confront the beast of
        all beasts - distribution. While we managed a limited theatrical release
        in March 2024, the film unfortunately had to be pulled from cinemas just
        as word of mouth was gaining momentum. Additionally (and more
        importantly), as of 2024, digital platforms aren’t considering
        independent films like ours any more. It’s not just tough getting their
        attention; it's impossible. So, here we are - on our own little website,
        distributing our film at any price YOU feel is right. 
      </p>
      <p className="thanks">
        Thank you for considering supporting our little film; it means the world
        to us!
      </p>
      <hr className="division-description" />

      <p className="password-instructions instruction-box">
        1. Fill in the details below. <br />
        2. Receive a PASSWORD in your email. <br />
        3. Copy and use it here for 48 hours.
      </p>
      <form className="payasyoulike-form" onSubmit={handleSubmit}>
        <div className="user-details">
          <div className="name-email-amount">
            <p className="name-text">Name </p>
            <p className="optional-text">(optional)</p>
            <p className="email-text"> Email </p>
            <p className="amount-text">Amount </p>
          </div>
          <div className="inputs">
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              className="input-name input-format"
            />
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              className="input-email input-format"
            />
            <input
              type="number"
              name="amount"
              value={userInfo.amount}
              onChange={handleChange}
              className="input-amount input-format"
            />
            <p className="contribution-zero">
              (you can enter '0' if you don't feel like contributing at this
              stage)
            </p>
          </div>
          <select
            className="currency-selector"
            name="currency"
            value={userInfo.currency}
            onChange={handleChange}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
            <option value="GBP">GBP</option>
            <option value="AUD">AUD</option>
            <option value="CAD">CAD</option>
            <option value="CHF">CHF</option>
            <option value="CNH">CNH</option>
            <option value="HKD">HKD</option>
            <option value="NZD">NZD</option>
          </select>
        </div>
        <div className="payasyoulike-button">
          <h3 className="get-password-text oswald">GET PASSWORD</h3>
          <button className="get-password-button" />
        </div>
      </form>
      <div className="contribution-section">
        <div className="budget-box">
          <p className="budget-text">budget: </p>
          <p className="budget-num">{totalBudget}</p>
        </div>
        <div className="contribution-chart">
          <div className="contribution-fill"></div>
          <hr className="budget-marker" />
          <div className="tube-curve-top" />
          <div className="tube-curve-bottom" />
          <div className="contri-cyl" />
        </div>
        <div className="contri-box">
          <p className="contri-text">contribution: </p>
          <p className="contri-num">{contriInrUsd}</p>
        </div>
      </div>
    </div>
  );
}
