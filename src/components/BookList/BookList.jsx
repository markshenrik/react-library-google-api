import React, { useMemo } from "react";
import { useGlobalContext } from "../../context";
import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
import "./BookList.css";

const BookList = () => {
  const { books, loading, resultTitle } = useGlobalContext();
  
  const booksWithCovers = books.filter(book => book.cover !== undefined)

  const loadingComponent = useMemo(() => {
    if (loading) {
      return <Loading />;
    }
    return null;
  }, [loading]);


  return (
    <section className="booklist">
      {loadingComponent ? (
        loadingComponent
      ) : (
        <div className="container">
          <div className="section-title">
            <h2>{resultTitle}</h2>
          </div>
          <div className="booklist-content grid">
            {booksWithCovers.map((item, index) => {
              return <Book key={index} {...item} />;
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default BookList;
