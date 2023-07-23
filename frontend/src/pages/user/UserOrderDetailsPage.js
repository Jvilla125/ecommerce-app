import UserOrderDetailsPageComponent from "./components/UserOrderDetailsPageComponent";

//user data is stored inside redux state
import { useSelector } from "react-redux"

// make api request to database
import axios from "axios";

// npm install paypal
import { loadScript } from "@paypal/paypal-js";

const getOrder = async (orderId) => {
    const { data } = await axios.get("/api/orders/user/" + orderId);
    return data;
}

const loadPayPalScript = (cartSubtotal, cartItems, orderId, updateStateAfterOrder) => {
    loadScript({
        "client-id":
            "AVH6hgJME87eBCY_GZ1t6UI-1Q9ciYQ2ng0ACIRfyJORPn__r_7q8aBlMex2NNvYZDyQl7SAyWyb4K_P"
    })
        .then(paypal => {
            paypal
                .Buttons(buttons(cartSubtotal, cartItems, orderId, updateStateAfterOrder))
                .render("#paypal-container-element");
        })
        .catch(err => {
            console.error("failed to load the PayPal JS SDK script", err)
        })
}

const buttons = (cartSubtotal, cartItems, orderId, updateStateAfterOrder) => {
    return {
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: cartSubtotal,
                            breakdown: {
                                item_total: {
                                    currency_code: "USD",
                                    value: cartSubtotal,
                                }
                            }
                        },
                        items: cartItems.map(product => {
                            return {
                                name: product.name,
                                unit_amount: {
                                    currency_code: "USD",
                                    value: product.price,
                                },
                                quantity: product.quantity,
                            }
                        })
                    }
                ]
            })
        },
        onCancel: onCancelHandler,
        onApprove: function(data, actions){
            return actions.order.capture().then(function (orderData){
                var transaction = orderData.purchase_units[0].payments.captures[0];
                if (transaction.status === "COMPLETED" && Number(transaction.amount.value) === Number(cartSubtotal)){
                    updateOrder(orderId)
                    .then(data => {
                        if (data.isPaid){
                            updateStateAfterOrder(data.paidAt);
                        }
                    })
                    .catch((er) => console.log(er))
                }
            })
        },
        onError: onErrorHandler,
    }
}


const onCancelHandler = function () {
    console.log("cancel");
}

const onErrorHandler = function (err) {
    console.log("error");
}

const updateOrder = async (orderId) => {
    const {data} = await axios.put("/api/orders/paid/" + orderId);
    return data; 
}

const UserOrderDetailsPage = () => {
    const userInfo = useSelector((state) => state.userRegisterLogin.userInfo)

    const getUser = async () => {
        const { data } = await axios.get("/api/users/profile/" + userInfo._id);
        return data;
    }
    return (
        <UserOrderDetailsPageComponent
            userInfo={userInfo}
            getUser={getUser}
            getOrder={getOrder}
            loadPayPalScript={loadPayPalScript}
        />
    )
}

export default UserOrderDetailsPage;