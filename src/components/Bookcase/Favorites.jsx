import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../BookList/BookList.css";

const Favorites = ({ bookshelfProps }) => {

  const {
    favBks,
    triggerRender,
    setTriggerRender,
    handleAction,
  } = bookshelfProps;

  return (
    <div className="container">
            {favBks.length > 0 ? (
              <div className="booklist-content grid">
                {favBks.map((book, index) => (
                  <div
                    key={book.id}
                    className="book-item flex flex-column flex-sb"
                  >
                    <div className="book-item-info text-center">
                      <Link to={`/book/${book.apiID}`} {...book}>
                        <div className="book-item-img">
                          <img src={book.cover} alt="cover" />
                        </div>

                        <div className="book-item-info-item title fw-7 fs-18">
                          <span>{book.title}</span>
                        </div>
                      </Link>

                      <div className="flex flex-column">
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
                            handleAction('read', book);
                          }}
                        >
                          Adicionar aos Livros Lidos
                        </button>
                        <button
                          className="remove-button-hover fs-18"
                          onClick={() => {
                            setTriggerRender(triggerRender + 1);
                            handleAction('removeFavorite', book);
                          }}
                        >
                          Remover dos Favoritos
                        </button>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-book-found fs-20 fw-6">
                Nenhum livro favorito encontrado
              </p>
            )}
          </div>
  );
};

export default Favorites;
