import { Outlet } from "react-router-dom";
import Header from "../Header";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { setProducts,setCategoris } from "../../features/store/slice/dataSlice";
import { getProducts } from "../../services/product";
import { getCategory } from "../../services/category";
import { getCart } from "../../services/cart";
import { setCart } from "../../features/store/slice/cartSlice";

const UserLayout = () => {
  const dispatch = useDispatch();

   const fetchProduct = async () =>{
      const product = await getProducts()
      dispatch(setProducts(product.data))
    }
  
    const fetchCategory = async () =>{
      const category = await getCategory()
      dispatch(setCategoris(category.data))
    }

    const fetchCart = async () =>{
      if(user){
        const cart = await getCart()
        dispatch(setCart(cart.data.cart.items))
      }
      return 0
    }
  const [mobileNav,setMobileNav] = useState(false)
  const user = useSelector((state)=>state.auth.user)
  const categories = useSelector((state)=>state.data.categoies)
  const product = useSelector((state)=>state.data.products)
   useEffect( () => {
    fetchProduct()
    fetchCategory()
    fetchCart()
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} setMobileNav={setMobileNav} mobileNav={mobileNav} product={product}/>
      <Navigation categories={categories} mobileNav={mobileNav}/>
      <main className="mx-auto max-w-7xl p-4">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default UserLayout;
