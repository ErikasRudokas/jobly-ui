import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Jobs from "./pages/Jobs/Jobs";
import JobDetails from "./pages/JobDetails/JobDetails";
import MyJobOffers from "./pages/MyJobOffers/MyJobOffers";
import MyJobOfferDetails from "./pages/MyJobOfferDetails/MyJobOfferDetails";
import CreateJobOffer from "./pages/CreateJobOffer/CreateJobOffer";
import EditJobOffer from "./pages/EditJobOffer/EditJobOffer";
import MyApplications from "./pages/MyApplications/MyApplications";
import MyApplicationDetails from "./pages/MyApplicationDetails/MyApplicationDetails";
import EditApplication from "./pages/EditApplication/EditApplication";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Categories from "./pages/Categories/Categories";
import CategoryDetails from "./pages/CategoryDetails/CategoryDetails";
import CreateCategory from "./pages/CreateCategory/CreateCategory";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {lightTheme} from "./common/themes/light-theme";
import {ROUTES} from "./common/constants/routes";
import {ROLES} from "./common/constants/roleConstants";

function AppContent() {
    const location = useLocation();
    const isHomePage = location.pathname === ROUTES.HOME;
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
                    <Route path={ROUTES.JOBS} element={<Jobs/>}/>
                    <Route path={ROUTES.JOB_DETAILS_PATTERN} element={<JobDetails/>}/>
                    <Route
                        path={ROUTES.PROFILE}
                        element={
                            <ProtectedRoute>
                                <Profile/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.MY_JOB_OFFERS}
                        element={
                            <ProtectedRoute requiredRole={ROLES.EMPLOYER}>
                                <MyJobOffers/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.MY_JOB_OFFER_DETAILS_PATTERN}
                        element={
                            <ProtectedRoute requiredRole={ROLES.EMPLOYER}>
                                <MyJobOfferDetails/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.JOB_OFFER_CREATE}
                        element={
                            <ProtectedRoute requiredRole={ROLES.EMPLOYER}>
                                <CreateJobOffer/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.JOB_OFFER_EDIT_PATTERN}
                        element={
                            <ProtectedRoute requiredRole={ROLES.EMPLOYER}>
                                <EditJobOffer/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.MY_APPLICATIONS}
                        element={
                            <ProtectedRoute requiredRole={ROLES.USER}>
                                <MyApplications/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.MY_APPLICATION_DETAILS_PATTERN}
                        element={
                            <ProtectedRoute requiredRole={ROLES.USER}>
                                <MyApplicationDetails/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.MY_APPLICATION_EDIT_PATTERN}
                        element={
                            <ProtectedRoute requiredRole={ROLES.USER}>
                                <EditApplication/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.CATEGORIES}
                        element={
                            <ProtectedRoute requiredRole={ROLES.ADMINISTRATOR}>
                                <Categories/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.CATEGORY_CREATE}
                        element={
                            <ProtectedRoute requiredRole={ROLES.ADMINISTRATOR}>
                                <CreateCategory/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.CATEGORY_DETAILS_PATTERN}
                        element={
                            <ProtectedRoute requiredRole={ROLES.ADMINISTRATOR}>
                                <CategoryDetails/>
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
