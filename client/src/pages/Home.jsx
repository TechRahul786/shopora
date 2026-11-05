import React from 'react'
import Carousel from '../components/Carousel'
import Category from '../components/Category';
import ProductSlider from '../components/ProductSlider';
import HeroSection from '../components/HeroSection';
import {featuredBanners , categories} from '../sample/product'
import UserReview from '../components/UserReview';
import NewsletterSubscriptionBanner from '../components/NewsletterSubscriptionBanner';
import FeaturesBar from '../components/FeaturesBar';

const Home = () => {
    
  return (
    <div className='flex flex-col gap-3'>
        <Carousel slides={featuredBanners} autoSlide={true} autoSlideInterval={5000}/>
        <Category categories={categories}/>
        <ProductSlider/>
        <HeroSection/>
        <UserReview/>
        <NewsletterSubscriptionBanner/>
        <FeaturesBar/>
    </div>
  )
}

export default Home

