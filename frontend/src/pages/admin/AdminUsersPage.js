import UsersPageComponent from "../../components/UsersPageComponent"

// axios is used to communicate with the backend
import axios from "axios";

// we are going to fetch users data using axios 
const fetchUsers = async () => {
    const {data} = await axios.get("/api/users");
    return data
}

const AdminUsersPage = () => {
    return <UsersPageComponent fetchUsers={fetchUsers}/>    
};

export default AdminUsersPage;