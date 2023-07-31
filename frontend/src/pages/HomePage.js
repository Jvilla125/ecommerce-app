import HomePageComponent from "./components/HomePageComponent";
import { useSelector } from "react-redux";
import axios from "axios";

const getBestSellers = async () => {
    const { data } = await axios.get("/api/products/bestsellers");
    return data;
}

const HomePage = () => {

    const { categories } = useSelector((state) => state.getCategories);

    return (
        <HomePageComponent categories={categories} getBestSellers={getBestSellers}/>
    )
}

export default HomePage;