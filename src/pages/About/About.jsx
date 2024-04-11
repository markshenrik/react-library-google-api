import React from "react";
import "./About.css";
import aboutImg from "../../images/about-img2.jpg";

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <div className="section-title">
          <h2>Sobre</h2>
        </div>

        <div className="about-content grid">
          <div className="about-img">
            <img src={aboutImg} alt="" />
          </div>
          <div className="about-text">
            <h2 className="about-title fs-26 ls-1">Sobre o LibertyLibrary</h2>
            <p className="fs-17 text-center">
              Este projeto pessoal foi meticulosamente concebido com o intuito
              exclusivo de ampliar e aprimorar as minhas competências no âmbito
              do desenvolvimento web. Trata-se de um projeto que consiste numa
              livraria e biblioteca virtual, proporcionando aos seus usuários
              uma experiência imersiva e enriquecedora.
            </p>
            <p className="fs-17 text-center">
              Por meio desta plataforma, os usuários têm a oportunidade não
              apenas de explorar uma vasta gama de obras literárias e seus
              respectivos autores, mas também de explorar uma série de recursos
              adicionais, como resumos detalhados, amostras de leitura prévia e
              muito mais. Além disso, os usuários são incentivados a criar uma
              conta pessoal, onde poderão catalogar e organizar as obras que
              desejam ler, já leram ou que se tornaram seus favoritos.
            </p>
            <p className="fs-17 text-center">
              O desenvolvimento do <b>LibertyLibrary</b> foi conduzido com a
              utilização criteriosa e estratégica da <b>Google Books API</b> e
              de algumas das mais renomadas ferramentas e tecnologias
              disponíveis no panorama do desenvolvimento web, incluindo
               <b>React</b> para a interface do usuário, <b>Node</b> com
               <b>Express</b> 
              para o desenvolvimento da API no backend e <b>MySQL</b> com
               <b>Sequelize</b> para o gerenciamento do banco de dados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
