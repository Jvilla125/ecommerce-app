import ProductDetailsPageComponent from "./components/ProductDetailsPageComponent";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";

import axios from "axios";

const getProductDetails = async (id) => {
    const { data } = await axios.get(`/api/products/get-one/${id}`);
    return data;
}

const ProductDetailsPage = () => {
    const dispatch = useDispatch();

    return (
        <ProductDetailsPageComponent
            addToCartReduxAction={addToCart}
            reduxDispatch={dispatch}
            getProductDetails={getProductDetails}
        />
    )
};

export default ProductDetailsPage;