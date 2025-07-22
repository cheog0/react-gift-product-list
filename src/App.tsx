import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import MyPage from '@/pages/MyPage';
import GiftOrderPage from '@/pages/GiftOrderPage';
import ThemePage from '@/pages/ThemePage';
import { ProtectedRoute } from '@/components/shared/ui';
import { ROUTES } from '@/constants/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<MainPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        <Route
          path={ROUTES.MY_PAGE}
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ORDER_PAGE}
          element={
            <ProtectedRoute>
              <GiftOrderPage />
            </ProtectedRoute>
          }
        />
        <Route path="/themes/:themeId" element={<ThemePage />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </Router>
  );
}

export default App;
