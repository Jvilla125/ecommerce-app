import CreateProductPageComponent from "./components/CreateProductPageComponent";
import axios from "axios";
import { uploadImagesApiRequest, uploadImagesCloudinaryApiRequest } from "./utils/utils"

import { useSelector } from "react-redux";
import { newCategory, deleteCategory } from "../../redux/actions/categoryActions";
import { useDispatch } from "react-redux";

const createProductApiRequest = async (formInputs) => {
    const { data } = await axios.post(`/api/products/admin`, { ...formInputs });
    return data;
}

const AdminCreateProductPage = () => {
    const { categories } = useSelector((state) => state.getCategories);
    const dispatch = useDispatch();

    return (
        <CreateProductPageComponent
            createProductApiRequest={createProductApiRequest} 
            uploadImagesApiRequest={uploadImagesApiRequest}
            uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
            categories={categories}
            reduxDispatch={dispatch}
            newCategory={newCategory}
            deleteCategory={deleteCategory}
            />
    )
}

export default AdminCreateProductPage;