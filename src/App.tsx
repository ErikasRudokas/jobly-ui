import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Jobs from "./pages/Jobs/Jobs";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {lightTheme} from "./common/themes/light-theme";
import {ROUTES} from "./common/constants/routes";

function AppContent() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const isAuthPage = location.pathname === ROUTES.LOGIN || location.pathname === ROUTES.REGISTER;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Header/>
            <Box component="main" sx={{flexGrow: 1}}>
                <Routes>
                    <Route path={ROUTES.HOME} element={<Home/>}/>
                    <Route path={ROUTES.LOGIN} element={<Login/>}/>
                    <Route path={ROUTES.REGISTER} element={<Register/>}/>
                    <Route
                        path={ROUTES.JOBS}
                        element={
                            <ProtectedRoute>
                                <Jobs/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.PROFILE}
                        element={
                            <ProtectedRoute>
                                <Profile/>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Box>
            {!isHomePage && !isAuthPage && <Footer/>}
        </Box>
    );
}

function App() {
    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline/>
            <BrowserRouter>
                <AppContent/>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
