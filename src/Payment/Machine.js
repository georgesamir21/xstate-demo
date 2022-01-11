import { assign, createMachine } from "xstate";

export const paymentMachine = createMachine(
  {
    initial: "idle",
    context: {
      paymentIsDone: false,
    },
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
          src: "doPayment",
          onDone: {
            target: "success",
            actions: "paymentIsDone",
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
      // do some logic to check if the user can submit...
      isAllowedToSubmit: (ctx, event) =>
        event.payload.nameOnCard && event.payload.cardNumber,
    },

    services: {
      // fake payment service...
      doPayment: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => resolve("Done"), 2000);
        });
      },
    },

    actions: {
      paymentIsDone: assign({
        paymentIsDone: (context, event) => true,
      }),
    },
  }
);
