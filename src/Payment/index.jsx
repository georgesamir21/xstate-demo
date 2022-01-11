import { useEffect } from "react";
import { useMachine } from "@xstate/react";
import classes from "./paymnet.module.css";
import { paymentMachine } from "./Machine";
export const Payment = () => {
  const [state, sendToMachine] = useMachine(paymentMachine);

  const hanldeSubmit = (e) => {
    e.preventDefault();
    const value = {
      nameOnCard: e.target.elements.nameOnCard.value.trim(),
      cardNumber: e.target.elements.cardNumber.value.trim(),
    };
    sendToMachine({
      type: "SUBMIT",
      payload: {
        ...value,
      },
    });
  };

  useEffect(() => {
    console.log("State is", state.value);
  }, [state]);

  return (
    <>
      <div className={classes.form_container}>
        <form onSubmit={hanldeSubmit} className="payment">
          <div className={classes.form_control}>
            <label htmlFor="nameOnCard">Name On Card</label>
            <input type="text" name="nameOnCard" id="nameOnCard" />
          </div>

          <div className={classes.form_control}>
            <label htmlFor="cardNumber">Card Number</label>
            <input type="text" name="cardNumber" id="cardNumber" />
          </div>
          <div className={classes.form_control}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};
