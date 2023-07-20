import UserCartDetailsPageComponent from "./components/UserCartDetailsPageComponent";

import { useSelector } from "react-redux";

const UserCartDetailsPage = () =>{
    const cartItems = useSelector((state) => state.cart.cartItems);
    const itemsCount = useSelector((state) => state.cart.itemsCount);
    const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);

    return(
        <UserCartDetailsPageComponent
        cartItems={cartItems}
        itemsCount={itemsCount}
        cartSubtotal={cartSubtotal}
        />
    )
}

export default UserCartDetailsPage;