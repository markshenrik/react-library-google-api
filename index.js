import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import { AppProvider } from './src/context.';
import './index.css';
import Home from './src/pages/Home/Home';
import About from "./src/pages/About/About";
import BookList from "./src/components/BookList/BookList";
import BookDetails from "./src/components/BookDetails/BookDetails";
import Signin from "./src/components/Modal/Signin";
import User from "./src/components/User/User";

const root = ReactDOM.createRoot(document.getElementById('root'));

// const User = ({Item}) => {
//   const signed = false;

//   return signed > 0 ? <Item /> : <Signin />;
// }

root.render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />}>
          <Route path = "/about" element = {<About />} />
          <Route path = "/" element = {<BookList />} />
          <Route path = "/book/:id" element = {<BookDetails />} />
          <Route path = "/sign" element = {<Signin />} />
          <Route path = "/user/:id" element = {<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppProvider>
);

