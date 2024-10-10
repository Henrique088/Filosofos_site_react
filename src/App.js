// src/PesquisaFilosofo.js
import React, { useState, useRef } from 'react';
import './style.css'; // Importa o CSS para estilizar o componente
import logo from './coracao.png';
import dados from './dados';  // Importa os dados localmente

function App() {

  const [data, setData] = useState(''); // Dados digitados no input de pesquisa
  const [result, setResult] = useState([]); // Resultado da pesquisa
  const [botao, setBotao] = useState('');  // Estado para controlar se o botão foi clicado
  const [error_02, setError_02] = useState(false); // Estado para lidar com erro de pesquisa vazia
  const [isFocused, setIsFocused] = useState(false);  // Estado para exibir lista de filósofos

  const handleFocus = () => {
    setIsFocused(true); // Exibir lista de filósofos
  };

  const handleBlur = () => {
    setIsFocused(false);  // Esconder lista de filósofos
  };

  // Função para exibir todos os filósofos disponíveis
  const handleFetch = () => {
    setIsFocused(true);
    setResult(dados);  // Usa os dados localmente
    setError_02(false);
  };

  // Função para pesquisar filósofos
  const handleSubmit = (e) => {
    e.preventDefault();  // Previne a atualização da página
    const pesquisa = data.toLowerCase();

    // Filtra os filósofos de acordo com o termo pesquisado
    const resultadoPesquisa = dados.filter(filosofo =>
      filosofo.titulo.toLowerCase().includes(pesquisa)
    );

    if (resultadoPesquisa.length === 0) {
      setError_02(true);  // Se nenhum resultado for encontrado
      setBotao('clicado');
      setResult([]);
    } else {
      setError_02(false);
      setResult(resultadoPesquisa);
      setData('');
      setBotao('clicado');
    }
  };

  return (
    <div>
      <nav>
        <div className="logo">
          <a href="#"><img src={logo} alt="logo de coracao" /></a>
          <a href="#" className="princi">Filosofia diária</a>
        </div>
      </nav>
      <header>
        <h1>Frases Filosóficas</h1>
        <h2>Encontre um Filósofo</h2>
      </header>
      <span className='todos'>
        <button id='botao' className="botao_01" type='' onClick={() => { handleFetch(); handleFocus(); }}>Filósofos disponíveis</button>
        {isFocused && (
          <div className='lista'>
            {result.length === 0 ? (
              <p>Nenhum filósofo encontrado.</p>
            ) : (
              result.map((filosofo, index) => (
                <a key={index} className="nomes">
                  {filosofo.titulo}
                </a>
              ))
            )}
          </div>
        )}
      </span>
      <main>
        <div className="ali">
          <section className="form-control">
            <input
              placeholder="Digite para buscar"
              type="text"
              className="input input-alt"
              value={data}
              onChange={(e) => setData(e.target.value)}
              onClick={handleBlur}
            />
            <span className="input-border input-border-alt"></span>
          </section>
          <button id="botao" type='submit' onClick={handleSubmit}>Pesquisar</button>
        </div>
        <section className="resultados-pesquisa">
          {result.length === 0 && error_02 && botao === 'clicado' ? (
            <div className="item-resultado">
              <p>Filósofo não encontrado na base de dados.</p>
            </div>
          ) : botao === 'clicado' ? (
            <div className="item-resultado">
              {result.map((filosofo, index) => (
                <div key={index} className="filosofo-item">
                  <h2>
                    <a href={filosofo.link} target="_blank" className="titulo" rel="noopener noreferrer">
                      {filosofo.titulo}
                    </a>
                  </h2>
                  <p>{filosofo.descricao}<br /><br />{filosofo.frase}</p>
                  <a href={filosofo.link} target="_blank" rel="noopener noreferrer">Saiba Mais</a>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      </main>
      <footer>
        <a>Todos os direitos reservados - 2024</a>
        <a>Contato: henriqueribeiro88bb@gmail.com</a>
      </footer>
    </div>
  );
};

export default App;
