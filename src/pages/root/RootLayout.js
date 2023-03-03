import { Outlet } from "react-router-dom";
import { UserContextProvider } from "../../store/user-context";
import NavBar from "../../components/navbar/NavBar";

const RootLayout = () => {
    return (
        <UserContextProvider>
            <div className="looking-glass">
                <NavBar />
                <Outlet />
            </div>
        </UserContextProvider>
    );
};

export default RootLayout;
