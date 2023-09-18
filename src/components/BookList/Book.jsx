import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";
import axios from "axios";
import "./BookList.css";

const Book = (book) => {
  const { books, loginUser, token } = useGlobalContext();
  const [bookcase, setBookcase] = useState(false);
  const [userBooks, setBooks] = useState([]);

  async function addBookcase() {
    const bookId = book.id;
    const bookTitle = book.title;
    const bookCover = book.cover;
    const storageLogin = localStorage.getItem("login");

    try {
      const response = await axios.post(`http://localhost:3001/addBookcase`, {
        bookId,
        bookTitle,
        bookCover,
        storageLogin,
      });
      setBookcase((prevBookcase) => !prevBookcase);
    } catch (error) {
      console.error(error);
    }
  }

  async function removeBookcase() {
    const bookId = book.id;
    const bookTitle = book.title;
    const storageLogin = localStorage.getItem("login");

    try {
      const response = await axios.delete(
        `http://localhost:3001/removeBookcase`,
        {
          data: {
            bookId,
            bookTitle,
            storageLogin,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
    setBookcase((prevBookcase) => !prevBookcase);
  }

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/books`, {
          params: {
            LoginUser: loginUser,
          },
        });

        setBooks(response.data);

        const bookIsInDatabase = response.data.some(
          (userBook) => userBook.apiID === book.id
        );

        setBookcase(bookIsInDatabase);
      } catch (error) {
        console.log("Falha ao buscar os livros");
      }
    };

    fetchBooks();
  }, [loginUser, book.id]);

  return (
    <div className="book-item flex flex-column flex-sb">
      <div className="book-item-info text-center">
        <Link to={`/book/${book.id}`} {...book}>
          <div className="book-item-img">
            <img src={book.cover} alt="cover" />
          </div>

          <div className="book-item-info-item title fw-7 fs-18">
            <span>{book.title}</span>
          </div>
        </Link>
        <div className="book-item-info-container">
          <div className="book-item-info-item author fs-15">
            <span className="text-capitalize fw-7">Author: </span>
            <span>
              {book.author && book.author.length > 0
                ? book.author.join(", ")
                : "No Author Found"}
            </span>
          </div>
          <div className="book-item-info-item author fs-15">
            <span className="text-capitalize fw-7">Price: </span>
            <span>{book.price ? "R$ " + book.price : "No Price Found"}</span>
          </div>
          {token && (
            <div className="book-item-info-item button">
              {bookcase ? (
                <button
                  className="remove-button-hover fs-18"
                  onClick={removeBookcase}
                >
                  Remover da Estante
                </button>
              ) : (
                <button
                  className="add-button-hover fs-18"
                  onClick={addBookcase}
                >
                  Adicionar à Estante
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Book;
