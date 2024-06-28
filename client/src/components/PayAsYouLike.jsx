import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./css/PayAsYouLike.css";
import load_animation from "./../assets/loading.gif";

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
  const [usdToInr, setUsdToInr] = useState(1);
  const [contriFillWidth, setContriFillWidth] = useState(0);
  const [paid, setPaid] = useState(false);
  const [showSolver, setShowSolver] = useState(false);
  const [arithmeticProblem, setArithmeticProblem] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [emailExists, setEmailExists] = useState(true);
  const [amountExists, setAmountExists] = useState(false);

  const updatedUserInfoRef = useRef(null);

  let updatedUserInfo = {};

  let newTotal = 1;

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

  function generateArithmeticProblem() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operation = ["+", "-", "*"][Math.floor(Math.random() * 3)];
    const problem = `${num1} ${operation} ${num2}`;

    setArithmeticProblem(problem);
    setCorrectAnswer(eval(problem));
  }

  function handleAnswerChange(event) {
    setUserAnswer(event.target.value);
  }

  function checkAnswer() {
    if (parseInt(userAnswer) === correctAnswer) {
      console.log("UpdatedUserInfo right before sendMail:", updatedUserInfo);
      setLoading(true);
      sendMail();
    } else {
      // alert("Incorrect answer, please try again.");
      setWrongAnswer(true);
    }
  }

  function sendMail() {
    console.log(
      "Inside PayAsYouLike -> sendMail for form:",
      updatedUserInfoRef.current
    );
    fetch("https://api.fairyfolkthefilm.com/email", {
      method: "POST",
      body: JSON.stringify(updatedUserInfoRef.current),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setUserInfo({
          name: "",
          email: "",
          amount: "",
        });
        setUserAnswer("");
        setLoading(false);
        setShowSolver(false);
        setPaid(true);
        setTimeout(() => {
          setPaid(false);
        }, 4000);
        setUserExists(false);
      })
      .catch((error) => console.log("Error:", error.message));
  }

  useEffect(() => {
    // Fetch Razorpay key from server
    axios
      .get("https://api.fairyfolkthefilm.com/razorpay/key")
      .then((response) => {
        setRazorpayKey(response.data.key);
      })
      .catch((error) => {
        console.error("Error fetching Razorpay key:", error);
      });

    // Fetch totalContributions from the json file

    fetch("https://api.fairyfolkthefilm.com/contribution")
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
    // Fetch USD/INR rate from server file usdConversion.json, update budget USD and contribution USD, all for an update on contribution chart
    fetch("https://api.fairyfolkthefilm.com/conversionrate")
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.result);
          });
        }
        return response.json();
      })
      .then((data) => {
        setUsdToInr(data.conversion_rates.INR);
        const contriINR = formatINR.format(totalContributions);
        const contriUSD = formatUSD.format(
          totalContributions / data.conversion_rates.INR
        );
        const budgetUSD = formatUSD.format(
          21000000 / data.conversion_rates.INR
        );
        setContriInrUsd(`${contriINR} / ${contriUSD}`);
        setTotalBudget(`₹2,01,24,526 / ${budgetUSD}`);
        setContriFillWidth((totalContributions / 20124526) * 100);
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

    if (name === "amount" && value.trim().length > 0) {
      setUserExists(true);
    } else setUserExists(false);
  }

  function storeContributionTotal(newTotal) {
    console.log(newTotal);
    fetch("https://api.fairyfolkthefilm.com/contribution", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newTotal }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function passwordCreation() {
    // Send a POST call to server to store just user info like password and all, generate a password, time, etc.
    fetch("https://api.fairyfolkthefilm.com/passwords/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message || "Could not reach the server!");
          });
        }
        return response.json();
      })
      .then((data) => {
        updatedUserInfoRef.current = data;

        console.log(
          "We are inside /passwords/create and updatedUserInfo is:",
          updatedUserInfoRef.current
        );
        // Send password to their email using getInTouch because email isn't working otherwise.
        setShowSolver(true);
        generateArithmeticProblem();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handlePayment() {
    // Send order to Razorpay, verify payment, store payment, update contribution chart
    console.log("Inside handlePayment!");
    const orderUrl = "https://api.fairyfolkthefilm.com/razorpay/create-order";
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
          const verifyUrl =
            "https://api.fairyfolkthefilm.com/razorpay/verify-payment";
          const paymentVerification = await axios.post(verifyUrl, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (paymentVerification.data.status === "success") {
            // setPaid(true);
            // setTimeout(() => {
            //   setPaid(false);
            //   setPasswordReadyForEmail(false);
            //   setUserInfo({
            //     name: "",
            //     email: "",
            //     currency: "INR",
            //     amount: "",
            //   });
            // }, 3500);
            passwordCreation();
            if (currency === "USD") {
              const inrAmount = amount * usdToInr;
              newTotal = totalContributions + parseInt(inrAmount);
            } else {
              newTotal = totalContributions + parseInt(amount);
            }
            setTotalContributions(newTotal);

            storeContributionTotal(newTotal); // Send a POST call for updating contributionTotal.json as well.

            // Send payment details to server for storage
            await axios.post(
              "https://api.fairyfolkthefilm.com/razorpay/payment-details",
              {
                userInfo,
                ...options,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }
            );
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

    if (userInfo.email === "") {
      setEmailExists(false);
      setUserInfo((prev) => {
        return {
          ...prev,
          amount: "",
        };
      });
      setUserExists(false);
      setTimeout(() => {
        setEmailExists(true);
        return;
      }, 2000);
    } else {
      if (userInfo.amount > 0) {
        console.log("Inside userInfo.amount > 0!!");
        handlePayment();
      } else {
        passwordCreation();
      }
    }
  }

  return (
    <div
      className="payasyoulike-container"
      style={{ position: paid ? "relative" : "static" }}
    >
      {showSolver && (
        <div className="solver-overlay">
          {loading ? (
            <img className="loading-animation" src={load_animation} />
          ) : (
            <div className={`solver ${showSolver ? "solver-show" : ""}`}>
              <h1>
                <b>{arithmeticProblem} = &nbsp;</b>
              </h1>

              <input
                className="input-solver"
                type="text"
                value={userAnswer}
                onChange={handleAnswerChange}
                onClick={() => setWrongAnswer(false)}
              />
              <br />
              {wrongAnswer && (
                <>
                  <br />
                  <br />
                  Wrong answer. Try again.
                  <br />
                  <br />
                </>
              )}
              <button className="solver-button oswald" onClick={checkAnswer}>
                SUBMIT
              </button>
              <button
                className="solver-button-cancel oswald"
                onClick={() => {
                  setShowSolver(false);
                  setUserAnswer("");
                  setWrongAnswer(false);
                }}
              >
                CANCEL
              </button>
            </div>
          )}
        </div>
      )}

      <div
        className={`msg-paid-notice ${paid ? "msg-paid-notice-show" : ""}`}
        onClick={() => setPaid(false)}
      >
        <h1>
          {userInfo.amount > 0 && "THANK YOU!<br />"}
          You'll find your password in your email.
        </h1>
      </div>
      <div
        className={`email-notice ${!emailExists ? "email-notice-show" : ""}`}
        onClick={() => setEmailExists(true)}
      >
        <h1>Enter a valid email address.</h1>
      </div>
      <div
        className="payasyoulike"
        style={{
          filter: paid || !emailExists ? "blur(3px)" : "",
          transition: "filter 1s ease",
        }}
      >
        <div className="all-page-headings">
          <h1 className="heading-thin ">PAY-AS-</h1>{" "}
          <h1 className="heading-thick you-like-text">YOU-LIKE</h1>
          <hr className="underline-heading-payasyoulike" />
        </div>

        <p className="main-text">
          As fun as our film 'Fairy Folk' was to make, the challenges we faced
          as a truly independent production ranged from testing to downright
          crippling. But we somehow made it through, only to confront the beast
          of all beasts - distribution. While we managed a limited theatrical
          release in March 2024, the film unfortunately had to be pulled from
          cinemas just as word of mouth was gaining momentum. Additionally (and
          more importantly), as of 2024, digital platforms aren’t considering
          independent films like ours any more. It’s not just tough getting
          their attention; it's impossible. So, here we are - on our own little
          website, distributing our film at any price YOU feel is right. 
        </p>
        <p className="thanks">
          Thank you for considering supporting our little film; it means the
          world to us!
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
            {/* <h3 className="get-password-text oswald">GET PASSWORD</h3> */}
            <button
              className={`oswald get-password-button ${
                userExists
                  ? "get-password-button-show get-password-button-active"
                  : ""
              }`}
              disabled={!userExists}
            >
              GET PASSWORD{" "}
            </button>
          </div>
        </form>
        <div className="contribution-section">
          <div className="budget-box">
            <p className="budget-text">budget: </p>
            <p className="budget-num">{totalBudget}</p>
          </div>
          <div className="contribution-chart">
            <div
              className="contribution-fill"
              style={{ width: `${contriFillWidth}%` }}
            />
            <hr className="budget-marker" />
            <div className="tube-curve-top" />
            <div className="tube-curve-bottom" />
            <div className="contri-cyl" />
          </div>
          <div className="contri-box">
            <p className="contri-text">contributions: </p>
            <p className="contri-num">{contriInrUsd}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
