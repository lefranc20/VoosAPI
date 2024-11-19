import React, { useState, useEffect } from 'react';

const VoosList = ({ refresh }) => {
  const [voos, setVoos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/voos')
      .then((response) => response.json())
      .then((data) => setVoos(data))
      .catch((error) => {
        console.error('Erro ao obter os dados:', error);
      });
  }, [refresh]); // Atualiza a lista quando refresh muda

  return (
    <div>
      <h2>Lista de Voos</h2>
      {voos.length === 0 ? (
        <p>Nenhum voo encontrado.</p>
      ) : (
        <ul>
          {voos.map((voo) => (
            <li key={voo.id}>
              {voo.origem} - {voo.destino} | {voo.data} {voo.hora}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VoosList;
