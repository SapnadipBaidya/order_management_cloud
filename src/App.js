import "./App.css";
import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { mapMenuRequested } from "./state-management/actions";

// Lazy load the components
const FormOrUpload = lazy(() => import("./components/FormAndUpload"));
const AdminScreenIndex = lazy(() => import("./components/AdminScreen/AdminScreenIndex"));
const CustomerDataScreenIndex = lazy(() => import("./components/CustomerDataScreen/CustomerDataScreenIndex"));
const OrderWorklistScreenIndex = lazy(() => import("./components/OrderWorklistSreen/OrderWorklistScreenIndex"));

// Define the routes configuration
const routes = [
  { path: '/admin', component: AdminScreenIndex },
  { path: '/orderWorklist', component: OrderWorklistScreenIndex },
  { path: '/customerData', component: CustomerDataScreenIndex },
  { path: '/orderForm', component: FormOrUpload },
];

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(mapMenuRequested("CRD-0"));
  }, [dispatch]);

  const loading = useSelector((state) => state?.mapMenuReducer?.loading);
  const mapMenuResponse = useSelector(
    (state) => state?.mapMenuReducer?.responseData
  );

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <NavBar loading={loading} mapMenuResponse={mapMenuResponse} flexDirection="row"/>
          <Routes>
            {routes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
};


// Add defaultProps
App.defaultProps = {
  flexDirection: 'row',
};

export default App;