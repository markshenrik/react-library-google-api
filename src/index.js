import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import { AppProvider } from './context';
import './index.css';
import Home from './pages/Home/Home';
import About from "./pages/About/About";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import Signin from "./components/Modal/ModalSign";
import User from "./components/User/User";
import NotFound from './components/NotFound/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));

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
          <Route path = "*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppProvider>
);

