import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

const ItemsCounter = ({ id, decrement, increment, amount }) => {
  return (
    <span className={"items-counter"}>
      <FiMinusCircle
        className={"icon-style"}
        size={30}
        onClick={() => decrement(id, amount)}
      />

      <h3> {amount} </h3>
      <FiPlusCircle
        className={"icon-style"}
        size={30}
        onClick={() => increment(id, amount)}
      />
    </span>
  );
};
export default ItemsCounter;
