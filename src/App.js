import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Products from './Pages/Product/Products';
import ProductAnalytics from './Pages/ProductAnalytics';
import ShopAnalytics from './Pages/ShopAnalytics';
import CustomerAnalytics from './Pages/CustomerAnalytics';
import Bill from './Pages/Bill';
import Layout from './Components/Layout';
import ProductCreate from './Pages/Product/ProductCreate';
import ProductEdit from './Pages/Product/ProductEdit';
import Orders from './Pages/Orders';
import Frequent from './Pages/Frequent';
import ScatterPlot from './Components/charts/ScatterPlot';
import ScatterTest from './ScatterTest';

function App() {
  return (
 <BrowserRouter>
  <Routes>
    <Route path='/' element={<Layout/>}>
    <Route path="/"  element={<Products />}></Route> 
    <Route path="/product"  element={<Products />}></Route> 
    <Route path="createproduct" element={<ProductCreate />} /> {/* Nested Create Page */}
    <Route path="editproduct/:id" element={<ProductEdit />} /> {/* Nested Edit Page */}
    <Route path='/bill' element={<Bill/>}></Route>
    <Route path='/prodAnalytics' element={<ProductAnalytics/>}></Route>
    <Route path='/shopAnalytics' element={<ShopAnalytics/>}></Route>
    <Route path='/orders' element={<Orders/>}></Route>
    <Route path='/frequent' element={<Frequent/>} ></Route>
    <Route path='/scattertest' element={<ScatterTest />} />
    </Route>
  </Routes>
 </BrowserRouter>
  );
}

export default App;
