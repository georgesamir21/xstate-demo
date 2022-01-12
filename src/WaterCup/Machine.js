import { createMachine, assign } from "xstate";

export const waterCupMachine = createMachine(
  {
    id: "waterCupMachine",
    initial: "empty",
    context: {
      amount: 0,
    },
    states: {
      empty: {
        on: {
          FILL: {
            target: "filling",
            actions: "onFill",
          },
        },
      },
      filling: {
        on: {
          FILL: [
            {
              target: "full",
              cond: "isFull",
            },
            {
              target: "filling",
              actions: "onFill",
            },
          ],
        },
      },
      full: {
        on: {
          EMPTY: {
            target: "empty",
            actions: "onEmpty",
          },
        },
      },
    },
  },
  {
    guards: {
      isFull: (ctx, event) => ctx.amount >= 10,
    },
    actions: {
      onFill: assign({
        amount: (ctx, event) => ctx.amount + 1,
      }),
      onEmpty: assign({
        amount: () => 0,
      }),
    },
  }
);
