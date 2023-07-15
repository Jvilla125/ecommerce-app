import UsersPageComponent from "./components/UsersPageComponent"

// axios is used to communicate with the backend
import axios from "axios";

// we are going to fetch users data using axios 
const fetchUsers = async (abctrl) => {
    const { data } = await axios.get("/api/users", {
        signal: abctrl.signal,
    });
    return data
}

// We are going to delete user by their userId by using axios
const deleteUser = async (userId) => {
    const { data } = await axios.delete(`/api/users/${userId}`);
    return data;
}

const AdminUsersPage = () => {
    // pass functions as props to UsersPageComponent
    return <UsersPageComponent fetchUsers={fetchUsers} deleteUser={deleteUser}/>
};

export default AdminUsersPage;