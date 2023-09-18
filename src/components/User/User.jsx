import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BiBookOpen } from "react-icons/bi";
import { BiBookContent } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import { FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Favorites from "../Bookcase/Favorites";
import NonRead from "../Bookcase/NonRead";
import Read from "../Bookcase/Read";
import Bookcase from "../Bookcase/Bookcase";
import NotFound from "../NotFound/NotFound";

import "../BookList/BookList.css";

const User = () => {
  const [user, setUser] = useState({
    login: "",
    name: "",
  });
  const [userBooks, setUserBks] = useState([]);
  const [favBks, setFavBks] = useState([]);
  const [nonReadBks, setNonReadBks] = useState([]);
  const [readBks, setReadBks] = useState([]);
  const [allCategBks, setCategBks] = useState([]);
  const [buttonRemoveState, setButtonRemoveState] = useState(
    Array(userBooks.length).fill(false)
  );
  const [triggerRender, setTriggerRender] = useState(0);
  const [nonAuthorized, setNonAuthorized] = useState(false);
  const token = localStorage.getItem("token");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { user } = response.data;

        setUser({
          login: user.login,
          name: user.name,
        });
      } catch (error) {
        setNonAuthorized(true);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timer);
  }, [params.id, userBooks, triggerRender]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/books`, {
          params: {
            LoginUser: `${params.id}`,
          },
        });

        const categorizedBooks = response.data.reduce(
          (categories, data) => {
            if (data.favorite) categories.fav.push(data);
            if (data.toRead) categories.nonRead.push(data);
            if (data.read) categories.read.push(data);
            return categories;
          },
          { fav: [], nonRead: [], read: [] }
        );

        setFavBks(categorizedBooks.fav);
        setNonReadBks(categorizedBooks.nonRead);
        setReadBks(categorizedBooks.read);
        setUserBks(response.data);
        const removeStates = response.data.reduce((states, book) => {
          states[book.id] = false;
          return states;
        }, {});
        setButtonRemoveState(removeStates);
      } catch (error) {
        alert("Falha ao buscar os livros");
      }
    };

    const timer = setTimeout(() => {
      fetchBooks();
    }, 1500);

    return () => clearTimeout(timer);
  }, [params.id, triggerRender]);

  useEffect(() => {
    const combinedBooks = [...favBks, ...nonReadBks, ...readBks];
    setCategBks(combinedBooks);
  }, [favBks, nonReadBks, readBks]);

  async function handleAction(actionType, bookItem) {
    try {
      switch (actionType) {
        case "read":
          await readBooks(bookItem);
          break;
        case "removeBookcase":
          await removeBookcase(bookItem);
          break;
        case "addFavorite":
          await addFavorite(bookItem);
          break;
        case "toRead":
          await toReadBooks(bookItem);
          break;
        case "removeFavorite":
          await removeFavorite(bookItem);
          break;
        default:
          console.error("Ação não reconhecida:", actionType);
      }
      setUserBks((prevUserBooks) =>
        prevUserBooks.filter((item) => item.id !== bookItem.id)
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function readBooks(bookItem) {
    const book = {
      title: bookItem.title,
      bookId: bookItem.apiID,
      storageLogin: localStorage.getItem("login"),
    };

    try {
      const response = await axios.put(`http://localhost:3001/readBooks`, {
        book,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function removeBookcase(bookItem) {
    const bookId = bookItem.apiID;
    const storageLogin = user.login;

    try {
      const response = await axios.delete(
        `http://localhost:3001/removeBookcase`,
        {
          data: {
            bookId,
            storageLogin,
          },
        }
      );

      setUserBks((prevUserBooks) =>
        prevUserBooks.filter((item) => item.id !== bookItem.id)
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async function addFavorite(bookItem) {
    const book = {
      title: bookItem.title,
      bookId: bookItem.apiID,
      storageLogin: localStorage.getItem("login"),
    };

    try {
      await axios.put(`http://localhost:3001/favoriteBooks`, {
        book,
      });
      setUserBks((prevUserBooks) =>
        prevUserBooks.filter((item) => item.id !== book.id)
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function toReadBooks(bookItem) {
    try {
      await axios.put(`http://localhost:3001/toReadBooks`, {
        bookItem,
      });
      setUserBks((prevUserBooks) =>
        prevUserBooks.filter((item) => item.id !== bookItem.id)
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFavorite(bookItem) {
    const book = {
      title: bookItem.title,
      bookId: bookItem.apiID,
      storageLogin: localStorage.getItem("login"),
    };

    try {
      await axios.put(`http://localhost:3001/removeFavorite`, {
        book,
      });
      setUserBks((prevUserBooks) =>
        prevUserBooks.filter((item) => item.id !== book.id)
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      {!nonAuthorized ? (
        <React.Fragment>
          <h1 className="text-center mg-2 pad-3">
            Bem-vindo(a) à sua estante de livros, {user.name.split(" ")[0]}
          </h1>
          <p className="text-center fw-3 fs-20 mg-2 pad-3">
            Aqui você poderá organizar os livros da sua estante entre os seus{" "}
            <a href="#favoritos">
              <strong>favoritos</strong>
            </a>
            , os que{" "}
            <a href="#toRead">
              <strong>você ainda não leu (ou já está lendo)</strong>
            </a>{" "}
            e os que já foram{" "}
            <a href="#read">
              <strong>lidos</strong>
            </a>
            .
          </p>
          <br /> <hr />
          <h2 className="session-title fs-26">
            Minha Estante
            <br />
            <BiBookContent className="text-purple" size={30} />
          </h2>
          <Bookcase
            bookshelfProps={{
              userBooks,
              allCategBks,
              triggerRender,
              setTriggerRender,
              buttonRemoveState,
              setButtonRemoveState,
              handleAction,
            }}
          />
          <br />
          <hr />
          <h2 className="session-title fs-26" id="favoritos">
            Livros Favoritos
            <br /> <FiHeart className="text-purple" size={30} />
          </h2>
          <Favorites
            bookshelfProps={{
              favBks,
              triggerRender,
              setTriggerRender,
              handleAction,
            }}
          />
          <br />
          <hr />
          <h2 className="session-title fs-26" id="toRead">
            Livros Não Lidos
            <br /> <FaBook className="text-purple" size={30} />
          </h2>
          <NonRead
            bookshelfProps={{
              nonReadBks,
              favBks,
              triggerRender,
              setTriggerRender,
              handleAction,
            }}
          />
          <br />
          <hr />
          <h2 className="session-title fs-26" id="read">
            Livros Lidos
            <br /> <BiBookOpen className="text-purple" size={30} />
          </h2>
          <Read
            bookshelfProps={{
              readBks,
              favBks,
              triggerRender,
              setTriggerRender,
              handleAction,
            }}
          />
          <br />
          <hr />
          <br />
          <br />
          <br />
        </React.Fragment>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default User;
