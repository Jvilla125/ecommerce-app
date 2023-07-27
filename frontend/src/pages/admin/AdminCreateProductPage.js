import CreateProductPageComponent from "./components/CreateProductPageComponent";
import axios from "axios";

const createProductApiRequest = async (formInputs) => {
    const { data } = await axios.post(`/api/products/admin`, {...formInputs});
    return data;
}

const uploadImagesApiRequest = async (images, productId) => {
    const formData = new FormData();
    Array.from(images).forEach(image => {
        formData.append("images", image);
    })
    await axios.post("/api/products/admin/upload?productId=" + productId, formData);
}

// this function uploads images to a separate website
const uploadImagesCloudinaryApiRequest = (images, productId) => {
    // settings in cloudinary
    const url = "https://api.cloudinary.com/v1_1/dg4sfz4b5/image/upload";
    const formData = new FormData();
    for (let i = 0; i < images.length; i++){
        let file = images[i];
        formData.append("file", file);
        // upload settings in cloudinary
        formData.append("upload_preset", "gztqjtr8");
        fetch(url, {
            method: "POST",
            body: formData,
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            // make an api post request to the database using the successful url from cloudinary
            axios.post("/api/products/admin/upload?cloudinary=true&productId=" + productId, data);
        })
    }
}

const AdminCreateProductPage = () => {
    return (
        <CreateProductPageComponent 
        createProductApiRequest={createProductApiRequest} uploadImagesApiRequest={uploadImagesApiRequest}
        uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}/>
    )
}

export default AdminCreateProductPage;