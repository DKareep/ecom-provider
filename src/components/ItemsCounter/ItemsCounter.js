import {FiMinusCircle, FiPlusCircle} from "react-icons/fi";


const ItemsCounter =({id, decrement, increment, amount}) => {
    return (
        <div><FiMinusCircle onClick={() => decrement(id, amount)}/>   {amount} <FiPlusCircle onClick={() => increment(id, amount)}/></div>
        )

}
export default ItemsCounter