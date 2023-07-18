import UserProfilePageComponent from "./components/UserProfilePageComponent";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setReduxUserState } from "../../redux/actions/userActions"

// Make an Api request to update the user's profile
const updateUserApiRequest = async (name, lastName, phoneNumber, address,
    country, zipCode, city, state, password) => {
    const { data } = await axios.put("/api/users/profile",
        { name, lastName, phoneNumber, address, country, zipCode, city, state, password },
    )
    return data
}

// Make an Api request to fetch user's data
const fetchUser = async (id) => {
    const { data } = await axios.get("/api/users/profile/" + id);
    return data;
};

const UserProfilePage = () => {
    const reduxDispatch = useDispatch();
    // get user's id from redux state using useSelector
    const { userInfo } = useSelector((state) => state.userRegisterLogin)

    return (
        <UserProfilePageComponent
            updateUserApiRequest={updateUserApiRequest}
            fetchUser={fetchUser}
            userInfoFromRedux={userInfo}
            setReduxUserState={setReduxUserState}
            reduxDispatch={reduxDispatch}
            localStorage={window.localStorage}
            sessionStorage={window.sessionStorage}
        />
    )
}

export default UserProfilePage;