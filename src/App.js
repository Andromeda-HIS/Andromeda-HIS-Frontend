import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/root/RootLayout";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import ContactPage from "./pages/contact/ContactPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ErrorPage from "./pages/error/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/contact", element: <ContactPage /> },
            { path: "/profile", element: <ProfilePage /> },
            {
                path: "/profile/account",
                element: <ProfilePage tab="Account" />,
            },
            {
                path: "/profile/adduser",
                element: <ProfilePage tab="Add User" />,
            },
            {
                path: "/profile/deleteuser",
                element: <ProfilePage tab="Delete User" />,
            },
            {
                path: "/profile/registerpatient",
                element: <ProfilePage tab="Register Patient" />,
            },
            {
                path: "/profile/admitpatient",
                element: <ProfilePage tab="Admit Patient" />,
            },
            {
                path: "/profile/makeappointment",
                element: <ProfilePage tab="Make Appointment" />,
            },
            {
                path: "/profile/dischargepatient",
                element: <ProfilePage tab="Discharge Patient" />,
            },
            {
                path: "/profile/searchpatient",
                element: <ProfilePage tab="Search Patient" />,
            },
            { path: "/profile/treat", element: <ProfilePage tab="Treat" /> },
            {
                path: "/profile/scheduletest",
                element: <ProfilePage tab="Schedule Test" />,
            },
            {
                path: "/profile/scheduletreatment",
                element: <ProfilePage tab="Schedule Treatment" />,
            },
            {
                path: "/profile/savetestresult",
                element: <ProfilePage tab="Save Test Result" />,
            },
            {
                path: "/*",
                element: (
                    <ErrorPage
                        status={404}
                        title="UH OH! You're lost."
                        message="The page you're looking for does not exist. Please click the button below to go back to the homepage."
                        link="/"
                        linkTitle="Home"
                    />
                ),
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
