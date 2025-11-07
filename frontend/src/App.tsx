import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookPage from "./pages/BookPage";
import TeacherResourcesPage from "./pages/TeacherResources";
import CodePal from "./pages/CodePal";
import { useOrientation } from "react-use";
import PleaseRotateScreen from "./components/PleaseRotateScreen";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUs from "./pages/contactus";
import EditBooksPage from "./pages/EditBooksPage";
import BookEditor from "./pages/BookEditor";
import Article from "./pages/Article";
import NewsPage from "./pages/NewsPage";
import { OpenAPI } from "./api";
import type { ApiRequestOptions } from "./api/core/ApiRequestOptions";

OpenAPI.BASE = process.env.REACT_APP_BACKEND_URL ||
  "https://codekids-backend.endeavour.cs.vt.edu";

// Configure authentication token
OpenAPI.TOKEN = async (options: ApiRequestOptions) => {
  // Get token from localStorage
  const token = localStorage.getItem('token');

  // If no direct token, check if user object exists
  if (!token) {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user.token || '';
      } catch (e) {
        return '';
      }
    }
  }

  return token || '';
};

// Configure headers with type assertion
OpenAPI.HEADERS = (async (options: ApiRequestOptions) => {
  const tokenFn = OpenAPI.TOKEN;
  if (typeof tokenFn === 'function') {
    const token = await tokenFn(options);
    if (token) {
      return { 'X-API-Key': token } as Record<string, string>;
    }
  }
  return {} as Record<string, string>;
}) as any;

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
              path="/book/:idString/:pageNumParam"
              element={<BookPage />}
            />
            <Route path="/codepal" element={<CodePal />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route
              path="/teacher_resources"
              element={<TeacherResourcesPage />}
            />
            <Route path="/about_us" element={<AboutUsPage />} />
            <Route path="/edit_books" element={<EditBooksPage />} />
            <Route
              path="/book_editor/:bookIdParam/:pageNumParam"
              element={<BookEditor />}
            />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/article/:articleNameParam" element={<Article />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;