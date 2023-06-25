import React, { useState, useEffect } from "react";
import {useParams } from 'react-router-dom';
import axios from 'axios';

const User = () => {
  const [user, setUser] = useState({});
  
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${params.id}`, {
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUser({
            login: data.login,
            name: data.name,
            email: data.email,
          });
        } else {
          throw new Error('Erro ao buscar os dados do usuário.');
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [params.id]);
  

  return (
    <div>
      <h1>Rota de usuário</h1>
      <ol>
        <li>{user.name}</li>
        <li>{user.login}</li>
        <li>{user.email}</li>
      </ol>
    </div>
  );
};

export default User;
