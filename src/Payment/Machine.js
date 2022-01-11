import { createMachine } from "xstate";

const doPayment = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Done"), 2000);
  });
};

export const paymentMachine = createMachine(
  {
    initial: "idle",
    states: {
      idle: {
        on: {
          SUBMIT: [
            {
              target: "loading",
              cond: "isAllowedToSubmit",
            },
            {
              target: "error",
            },
          ],
        },
      },
      loading: {
        invoke: {
          id: "doPayment",
          src: () => doPayment(),
          onDone: {
            target: "success",
          },
          onError: {
            target: "error",
          },
        },
      },
      error: {
        on: {
          SUBMIT: {
            target: "loading",
            cond: "isAllowedToSubmit",
          },
        },
      },
      success: {
        type: "final",
      },
    },
  },
  {
    guards: {
      isAllowedToSubmit: (ctx, event) =>
        event.payload.nameOnCard && event.payload.cardNumber,
    },
    
  }
);
