import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Jobs from "./pages/Jobs/Jobs";
import Profile from "./pages/Profile/Profile";
import Footer from "./components/Footer/Footer";
import { lightTheme } from "./common/themes/light-theme";

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Box>
      {!isHomePage && <Footer />}
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
