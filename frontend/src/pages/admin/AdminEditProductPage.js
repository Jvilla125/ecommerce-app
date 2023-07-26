import EditProductPageComponent from "./components/EditProductPageComponent";

import { useSelector } from "react-redux";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { saveAttributeToCatDoc } from "../../redux/actions/categoryActions";

const fetchProduct = async (productId) => {
    const { data } = await axios.get(`/api/products/get-one/${productId}`);
    return data;
}

const updateProductApiRequest = async (productId, formInputs) => {
    const { data } = await axios.put(`/api/products/admin/${productId}`, { ...formInputs });
    return data;
}

const AdminEditProductPage = () => {

    const { categories } = useSelector((state) => state.getCategories);
    const reduxDispatch = useDispatch();

    return <EditProductPageComponent categories={categories} fetchProduct={fetchProduct} updateProductApiRequest={updateProductApiRequest} 
    reduxDispatch={reduxDispatch} saveAttributeToCatDoc={saveAttributeToCatDoc} />;
};

export default AdminEditProductPage;
