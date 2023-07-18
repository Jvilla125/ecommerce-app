import UserProfilePageComponent from "./components/UserProfilePageComponent";
import axios from "axios";
import { useSelector } from "react-redux";

// Make an Api request to update the user's profile
const updateUserApiRequest = async (name, lastName, phoneNumber, address,
    country, zipCode, city, state, password) => {
    const { data } = await axios.put("/api/users/profile",
        { name, lastName, phoneNumber, address, country, zipCode, city, state, password },
    )
    return data
}

// Make an Api request to fetch user's data
const fetchUser = async (user_id) => {
    const { data } = await axios.get("/api/users/profile/" + user_id);
    return data;
}

const UserProfilePage = () => {
    // get user's id from redux state using useSelector
    const { userInfo } = useSelector((state) => state.userRegisterLogin)

    return (
        <UserProfilePageComponent updateUserApiRequest={updateUserApiRequest}
            fetchUser={fetchUser} userInfo={userInfo} />
    )
}

export default UserProfilePage;