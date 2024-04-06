import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";


const Profile = () => {
    const {user}=useContext(AuthContext)
    return (
        <div>
            <h2>Profile holder:{user.email}</h2>
        </div>
    );
};

export default Profile;