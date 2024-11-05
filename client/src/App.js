import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './utils/GlobalState';

import Home from './pages/Home/Home'
import Detail from './pages/Detail/Detail'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import ProductsDisplay from './pages/ProductsDisplay/ProductsDisplay'
import Cart from './components/Cart/Cart';
import Favorites from './pages/Favorites/Favorites'
import Checkout from './pages/Checkout/Checkout'
import Profile from './pages/Profile/Profile'
import OrderDetails from './pages/OrderDetails/OrderDetails';
import Success from './pages/Success/Success'
import Error from './pages/Error/Error'

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

import { useState } from 'react'

function App() {
  // MAKES SURE THAT ON PAGE REFRESH THAT THE SUBCATEGORY TITLE PERSISTS SO THAT
  // THERE ARE NO ERRORS
  const [navClick, setNavClick] = useState(window.location.href.split('/').slice(-1)[0].split('%20').join(' '))

  const [allLingerie, setAllLingerie] = useState('All Lingerie')
  const [allFragrance, setAllFragrance] = useState('All Fragrance')
  const [productFavorite, setProductFavorite] = useState([])
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <StoreProvider>
        <Navbar setNavClick={setNavClick} navClick={navClick}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/lingerie' element={<ProductsDisplay count={count} setCount={setCount} title={allLingerie} setProductFavorite={setProductFavorite} productFavorite={productFavorite}/>}/>
          <Route path='/fragrance' element={<ProductsDisplay count={count} setCount={setCount} title={allFragrance} setProductFavorite={setProductFavorite} productFavorite={productFavorite}/>}/>
          <Route path="/lingerie/:subcategory" element={<ProductsDisplay count={count} setCount={setCount} setProductFavorite={setProductFavorite} productFavorite={productFavorite}/>} />
          <Route path="/fragrance/:subcategory" element={<ProductsDisplay count={count} setCount={setCount} setProductFavorite={setProductFavorite} productFavorite={productFavorite}/>} />
          {/* <Route path={navClick !== '' ? `/lingerie/${navClick}` : '/lingerie'} element={<ProductsDisplay title={navClick}/>}/>
          <Route path={navClick !== '' ? `/fragrance/${navClick}` : '/fragrance'} element={<ProductsDisplay title={navClick}/>}/> */}
          {/* <Route path='/products/:id' element={<Detail/>}/>
          <Route path='/checkout' element={<Checkout/>}/> */}
          <Route path='/product/:id' element={<Detail/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/profile' element={<Profile count={count} setCount={setCount} setProductFavorite={setProductFavorite} productFavorite={productFavorite}/>}/> 
          <Route path='/profile/favorites' element={<Favorites count={count} setCount={setCount} setProductFavorite={setProductFavorite} productFavorite={productFavorite}/>}/>
          <Route path='/profile/orders' element={<OrderDetails/>}/>
          <Route path='/success' element={<Success/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/*' element={<Error/>}/>
        </Routes>
        <Footer/>
        </StoreProvider>
      </div>
    </Router>
  );
}



export default App;
