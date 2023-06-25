import React from 'react';
import Navbar from "../Navbar/Navbar";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

const Header = () => {
  return (
    <div className='holder'>
        <header className='header'>
            <Navbar />
            <div className='header-content flex flex-c text-center text-white'>
                <h2 className='header-title text-capitalize'>Encontre o livro que deseja</h2><br />
                <p className='header-text fs-18 fw-4'>Abra um livro e mergulhe em um mundo de infinitas possibilidades. Cada palavra escrita é um portal para novas perspectivas.</p>
                <SearchForm />
            </div>
        </header>
    </div>
  )
}

export default Header