import React from "react";
import { Link } from "react-router-dom";
import "../BookList/BookList.css";


const Bookcase = ({ bookshelfProps }) => {

  const {
    userBooks,
    allCategBks,
    triggerRender,
    setTriggerRender,
    setButtonRemoveState,
    buttonRemoveState,
    handleAction,
  } = bookshelfProps;


  return (
    <div className="container">
      {userBooks.length > 0 ? (
        <div className="booklist-content grid">
          {userBooks.map((book, index) => (
            <div key={book.id} className="book-item flex flex-column">
              <div className="book-item-info flex flex-column flex-sb">
                <Link to={`/book/${book.apiID}`} {...book}>
                  <div className="book-item-img">
                    <img src={book.cover} alt="cover" />
                  </div>

                  <div className="book-item-info-item title fw-7 fs-18">
                    <span>{book.title}</span>
                  </div>
                </Link>

                <div className="flex flex-column ">
                  {!allCategBks.find((item) => item === book) && (
                    <div className="flex flex-column">
                      <button
                        className="add-button-hover fs-18"
                        onClick={() => {
                          setTriggerRender(triggerRender + 1);
                          handleAction('read', book);
                        }}
                      >
                        Adicionar aos Livros Lidos
                      </button>
                      <button
                        className="add-button-hover fs-18"
                        onClick={() => {
                          setTriggerRender(triggerRender + 1);
                          handleAction('toRead', book);
                        }}
                      >
                        Adicionar aos Livros Não Lidos
                      </button>
                      <button
                        className="add-button-hover fs-18"
                        onClick={() => {
                          setTriggerRender(triggerRender + 1);
                          handleAction('addFavorite', book);
                        }}
                      >
                        Adicionar aos Favoritos
                      </button>
                    </div>
                  )}

                  {!buttonRemoveState[book.id] ? (
                    <button
                      className="bg-red text-white fs-18"
                      onClick={() => {
                        setButtonRemoveState((prevState) => ({
                          ...prevState,
                          [book.id]: true,
                        }));
                        setTriggerRender(triggerRender + 1);
                      }}
                    >
                      Remover da Estante
                    </button>
                  ) : (
                    <p className="question-confirm fw-6">
                      Deseja realmente remover este livro?
                    </p>
                  )}
                  {buttonRemoveState[book.id] && (
                    <div>
                      <button
                        className="question-btn fw-6"
                        onClick={() => {
                          handleAction('removeBookcase', book);
                          setButtonRemoveState((prevState) => ({
                            ...prevState,
                            [book.id]: false,
                          }));
                        }}
                      >
                        SIM
                      </button>
                      <button
                        className="question-btn fw-6"
                        onClick={() => {
                          setButtonRemoveState((prevState) => ({
                            ...prevState,
                            [book.id]: false,
                          }));
                        }}
                      >
                        NÃO
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-book-found fs-20 fw-6">Não há livros na sua estante</p>
      )}
    </div>
  );
};

export default Bookcase;
