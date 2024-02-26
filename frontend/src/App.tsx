import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookPage from "./pages/BookPage";
import BookCategoryPage from "./pages/BookCategoryPage";
import TeacherResourcesPage from "./pages/TeacherResources";
import RushHourPage from "./pages/RushHourPage";
import { useOrientation } from "react-use";
import PleaseRotateScreen from "./components/PleaseRotateScreen";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUs from './pages/contactus';

function App() {
  const orientation = useOrientation();
  if (orientation.type === "portrait-primary") {
    return (
      <PleaseRotateScreen message="Please rotate your device to landscape mode to use this app." />
    );
  } else {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/book/:idString/:pagenumString"
              element={<BookPage />}
            />
            <Route
              path="/book_category/:categoryString"
              element={<BookCategoryPage />}
            />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/activity/rush-hour" element={<RushHourPage />} />
            <Route
              path="/teacher_resources"
              element={<TeacherResourcesPage />}
            />
            <Route path="/about_us" element={<AboutUsPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
