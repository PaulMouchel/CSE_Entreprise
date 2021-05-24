import React from 'react';

import Quotation from './Quotation.jsx'

const Home = () => {
  return ( 
    <div className="min-h-screen flex flex-col justify-evenly items-center bg-beach bg-fixed">
      <div className="p-10 flex justify-center items-center bg-gray-100 bg-opacity-70 md:rounded-lg">
        <h1 className="text-5xl text-gray-800 text-center">Bienvenue sur le site du CSE<br/>d'Actemium Rennes</h1>
      </div>
      <Quotation/>
    </div>
  );
}

export default Home;