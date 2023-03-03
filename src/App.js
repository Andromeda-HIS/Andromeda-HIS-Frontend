import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/root/RootLayout";
import HomePage from "./pages/home/HomePage";
import ProfilePage from "./pages/profile/ProfilePage";
import LoginPage from "./pages/login/LoginPage";

// const router = createBrowserRouter([
//     { path: '/', element: <HomePage />},
//     { path: '/login', element: <LoginPage />},
//     { path: '/profile', element: <ProfilePage />}
// ]);

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/profile", element: <ProfilePage /> },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
