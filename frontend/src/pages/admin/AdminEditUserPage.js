import EditUserPageComponent from "./components/EditUserPageComponent";

const updateUserApiRequest = (name, lastName, email, isAdmin) => {
    console.log(name, lastName, email, isAdmin);
}

const AdminEditUserPage = () => {
    return (
        <EditUserPageComponent updateUserApiRequest={updateUserApiRequest}/>
    )
}

export default AdminEditUserPage;