import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import { message } from "antd";
import "./assets/style.css";
import PrivateRoute from "./components/PrivateRoute";
import { PATHS } from "./constants/path";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import ContactPage from "./pages/ContactPage";
import DashBoardPage from "./pages/DashBoardPage";
import FaqPage from "./pages/FaqPage";
import HomePape from "./pages/HomePage";
import { default as Page404, default as ReturnsPage } from "./pages/Page404";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductPage from "./pages/ProductPage";
import ShippingPage from "./pages/ShippingPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { handleGetProfile } from "./store/reducers/authReducer";
import { handleGetCart } from "./store/reducers/cartReducer";
import tokenMethod from "./utils/token";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    message.config({
      top: 10,
      duration: 2,
      maxCount: 3,
    });
    if (!!tokenMethod.get) {
      dispatch(handleGetProfile());
      dispatch(handleGetCart());
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePape />} />

          <Route path={PATHS.PRODUCTS} element={<ProductPage />} />
          <Route path={PATHS.PRODUCTS_DETAIL} element={<ProductDetailPage />} />
          <Route path={PATHS.DASHBOARD} element={<DashBoardPage />} />
          <Route path={PATHS.FAQ} element={<FaqPage />} />
          <Route path={PATHS.PAYMENT_METHOD} element={<PaymentMethodPage />} />
          <Route path={PATHS.RETURN} element={<ReturnsPage />} />
          <Route path={PATHS.SHIPPING} element={<ShippingPage />} />
          <Route path={PATHS.BLOG} element={<BlogPage />} />
          <Route path={PATHS.CONTACT} element={<ContactPage />} />
          <Route path={PATHS.ABOUT} element={<AboutPage />} />
          <Route path={PATHS.PRIVATE_POLICY} element={<PrivacyPolicyPage />} />

          {/* Private route */}
          <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
            <Route path={PATHS.CART} element={<CartPage />} />
            <Route path={PATHS.CHECKOUT} element={<CheckoutPage />} />
            <Route
              path={PATHS.CHECKOUT_SUCCESS}
              element={<CheckoutSuccessPage />}
            />
            <Route path={PATHS.DASHBOARD} element={<DashBoardPage />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
