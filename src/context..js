import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState("");
  const apiKey = process.env.REACT_APP_API_KEY;


  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}&maxResults=40`
      );
      const data = await response.json();
      const { items } = data;
     
      if (items) {
        const newBooks = items.map((bookSingle) => {
          const { id, volumeInfo, accessInfo, saleInfo } = bookSingle;
          
          return {
            id: id,
            pages: volumeInfo.pageCount,
            author: volumeInfo.authors,
            cover: volumeInfo.imageLinks?.smallThumbnail,
            description: volumeInfo.description,
            title: volumeInfo.title,
            publisher: volumeInfo.publisher,
            reader: accessInfo.webReaderLink,
            price: saleInfo.listPrice?.amount,
          };
        });

        setBooks(newBooks);

        if (newBooks.length > 1) {
          setResultTitle("Resultado da sua pesquisa...");
        } else if (resultTitle === "Nenhum resultado encontrado!") {
          setResultTitle("Nenhum resultado encontrado!");
        }
      } else {
        setBooks([]);
        setResultTitle("Nenhum resultado encontrado!");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm, apiKey, resultTitle]);

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, fetchBooks]);

  return (
    <AppContext.Provider
      value={{
        loading,
        books,
        setSearchTerm,
        resultTitle,
        setResultTitle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
