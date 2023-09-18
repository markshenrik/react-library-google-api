import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
import { FaArrowLeft } from "react-icons/fa";


const URL = "https://www.googleapis.com/books/v1/volumes/";

const BookDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
 

  const handleGoBack = () => {
    navigate(-1)
  };

  function removeTagsHTML(textoComTags) {
    return textoComTags.replace(/(<([^>]+)>)/gi, "");
  }

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}`);
        const data = await response.json();
        console.log(data);

        if (data) {
          const { id, volumeInfo, accessInfo, saleInfo } = data;
          const newBook = {
            id: id,
            pages: volumeInfo.pageCount,
            author: volumeInfo.authors,
            price: saleInfo.listPrice?.amount
              ? "R$ " + saleInfo.listPrice?.amount
              : "No price found",
            cover: volumeInfo.imageLinks?.smallThumbnail
              ? volumeInfo.imageLinks.smallThumbnail
              : coverImg,
            description: volumeInfo.description
              ? volumeInfo.description
              : "No description found",
            title: volumeInfo.title,
            publisher: volumeInfo.publisher
              ? volumeInfo.publisher
              : "No publisher found",
            reader: accessInfo.webReaderLink
              ? accessInfo.webReaderLink
              : "No reader found",
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  const loadingComponent = useMemo(() => {
    if (loading) {
      return <Loading />;
    }
    return null;
  }, [loading]);

  return (
    <section className="book-details">
      {loadingComponent ? (
        loadingComponent
      ) : (
        <div className="container">
          <button
            type="button"
            className="flex flex-c back-btn"
            onClick={handleGoBack}
          >
            <FaArrowLeft size={22} />
            <span className="fs-18 fw-6">Go Back</span>
          </button>
          <div className="book-details-content grid">
            <div className="book-details-img">
              <img src={book?.cover} alt="cover img" />
            </div>
            <div className="book-details-info">
              <div className="book-details-item title">
                <span className="fw-6 fs-24">{book?.title}</span>
              </div>
              <div className="book-details-item">
                <span className="fw-6">Author(s): </span>
                {book?.author
                  ? book.author.map((author, index) => (
                      <span key={index}>{author}</span>
                    ))
                  : "No authors found"}
              </div>
              <div className="book-details-item description">
                <span>
                  {book?.description && removeTagsHTML(book.description)}
                </span>
              </div>
              <div className="book-details-item">
                <span className="fw-6">Publisher: </span>
                <span className="text-italic">{book?.publisher}</span>
              </div>
              <div className="book-details-item">
                <span className="fw-6">Pages: </span>
                <span className="text-italic">{book?.pages}</span>
              </div>
              <div className="book-details-item">
                <span className="fw-6">Price: </span>
                <span className="text-italic">{book?.price}</span>
              </div>
              <div className="book-details-item">
                <span className="fw-6">Reader: </span>
                <a
                  href={book?.reader}
                  target="blank"
                  className="text-bold fw-7"
                >
                  {book?.title}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookDetails;
