import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './Root';
import Home from './Home';
import Cart from './Cart';
import NotFound from './NotFound';
import { Provider } from 'react-redux'
import { store } from './Redux/store'
import ProductDetails from './Details/product-details';


import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="product-details/:id" element={<ProductDetails />} />
      
      
      <Route path="*" element={<NotFound />} />
      
      {/* ... etc. */}
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);


