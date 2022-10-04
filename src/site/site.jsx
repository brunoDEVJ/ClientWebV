import React from 'react';
import Banner from './components/banner';
import Menu from './components/menu'
import Feature from './components/feature';
import Post from './components/post';
import Price from './components/price';
import Footer from './components/footer';


function Site(){
    return <div>
        <Menu/>
        <Banner/>
        <Feature/>
        <Post/>
        <Price/>
        <Footer/>
    </div>;
  }

export default Site;

