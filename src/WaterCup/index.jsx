import { useMachine } from "@xstate/react";
import { waterCupMachine } from "./Machine";

export const WaterCup = () => {
  const [state, sendToMachine] = useMachine(waterCupMachine);
  const howFull = state.context.amount;

  const handleFillCup = () => {
    sendToMachine({
      type: "FILL",
    });
  };

  const handleEmptyCup = () => {
    sendToMachine({
      type: "EMPTY",
    });
  };

  return (
    <div>
      <h2 style={{
        background: `linear-gradient(to right, blue ${howFull * 10}%, white 0%)` /* W3C */
      }} onClick={handleFillCup}>Click to fill cup!</h2>
      {howFull >= 10 && <h3 onClick={handleEmptyCup}>Emty cup!</h3>}
    </div>
  );
};
