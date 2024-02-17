import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
// import { useAuth } from "./context/AuthContext";
import Signup from "./pages/Signup";
import BookPage from "./pages/BookPage";
import BookCategoryPage from "./pages/BookCategoryPage";
import ActivityPostList from "./pages/Activities";
import RushHourPage from "./pages/RushHour";

function App() {
  // const { token } = useAuth();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/book/:idString/:pagenumString" element={<BookPage />} />
          <Route
            path="/book_category/:categoryString"
            element={<BookCategoryPage />}
          />
          <Route path="/activity/rush-hour" element={<RushHourPage />} />
          <Route path="/activities/:pageStr" element={<ActivityPostList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
