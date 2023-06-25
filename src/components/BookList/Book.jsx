import React from "react";
import { Link } from "react-router-dom";
import "./BookList.css";

const Book = (book) => {

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
          <span>
            {book.price ? "R$ " + book.price : "No Price Found"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Book;
