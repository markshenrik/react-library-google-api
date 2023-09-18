import React from "react";
import { Link } from "react-router-dom";
import "../BookList/BookList.css";

const NonRead = ({ bookshelfProps }) => {
  const { nonReadBks, favBks, triggerRender, setTriggerRender, handleAction } =
    bookshelfProps;

  return (
    <div className="container">
      {nonReadBks.length > 0 ? (
        <div className="booklist-content grid">
          {nonReadBks.map((book, index) => (
            <div key={book.id} className="book-item flex flex-column flex-sb">
              <div className="book-item-info text-center">
                <Link to={`/book/${book.apiID}`} {...book}>
                  <div className="book-item-img">
                    <img src={book.cover} alt="cover" />
                  </div>

                  <div className="book-item-info-item title fw-7 fs-18">
                    <span>{book.title}</span>
                  </div>
                </Link>
                <div className="flex flex-column ">
                  <button
                    className="add-button-hover fs-18 "
                    onClick={() => {
                      setTriggerRender(triggerRender + 1);
                      handleAction("read", book);
                    }}
                  >
                    Mover para os Livros Lidos
                  </button>
                  {!favBks.includes(book) && (
                    <button
                      className="add-button-hover fs-18"
                      onClick={() => {
                        setTriggerRender(triggerRender + 1);
                        handleAction("addFavorite", book);
                      }}
                    >
                      Adicionar aos Favoritos
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-book-found fs-20 fw-6">
          Nenhum livro não lido encontrado
        </p>
      )}
    </div>
  );
};

export default NonRead;
