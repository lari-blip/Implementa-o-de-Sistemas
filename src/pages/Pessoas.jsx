import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserPlus, FaTrash } from "react-icons/fa";
import "../styles/pessoas.css";

function Pessoas() {
  const [pessoas, setPessoas] = useState([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const listRef = useRef(null); // Referência para a lista de pessoas

  const adicionarPessoa = () => {
    if (!nome || !idade) return;

    const novaPessoa = {
      id: pessoas.length + 1,
      nome,
      idade: parseInt(idade),
    };

    setPessoas([...pessoas, novaPessoa]);
    setNome("");
    setIdade("");

    // Quando o número de pessoas for maior ou igual a 1, ativa a rolagem.
    if (listRef.current && pessoas.length + 1 >= 1) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  const removerPessoa = (id) => {
    setPessoas(pessoas.filter((pessoa) => pessoa.id !== id));
  };

  return (
    <div className="container">
      <div className="left-section">
        <img
          src="https://i.imgur.com/1mQ8J5e.png"
          alt="Illustration"
          className="illustration"
        />
      </div>
      <div className="right-section">
        <h1>Cadastro de Pessoas</h1>
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={(e) => {
            e.preventDefault();
            adicionarPessoa();
          }}
        >
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="number"
            placeholder="Idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />
          <button type="submit" className="add-button">
            <FaUserPlus /> Adicionar
          </button>
        </motion.form>

        <div
          className="pessoas-list"
          ref={listRef} // Atribuindo a referência à lista
          style={{
            maxHeight: pessoas.length >= 1 ? "300px" : "0", // Só mostra o scroll após 2 itens
            overflowY: pessoas.length >= 2 ? "auto" : "hidden", // Aplica o scroll somente se houver 2 ou mais itens
            paddingRight: "20px", // Para não colar a barra de rolagem
            transition: "max-height 0.3s ease", // Transição suave para mostrar o scroll
          }}
        >
          <AnimatePresence>
            {pessoas.map((pessoa) => (
              <motion.div
                key={pessoa.id}
                className="pessoa-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <span>
                  {pessoa.nome} ({pessoa.idade} anos)
                </span>
                <button
                  className="delete-button"
                  onClick={() => removerPessoa(pessoa.id)}
                >
                  <FaTrash />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Pessoas;
