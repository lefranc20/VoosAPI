import React, { useState } from "react";

const VooForm = () => {
  const [voo, setVoo] = useState({
    origem: "",
    destino: "",
    data: "",
    hora: "",
    preco: "",
  });
  const [voos, setVoos] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVoo((prevVoo) => ({
      ...prevVoo,
      [name]: value,
    }));
  };
  
	const handleAddVoo = () => {
	  console.log("Voo a ser enviado:", voo);  // Veja o que está sendo enviado
	  fetch("http://localhost:8080/sistema/voo", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(voo),
	  })
		.then((response) => {
		  if (response.ok) {
			setVoos([...voos, voo]);
			setVoo({ origem: "", destino: "", data: "", hora: "", preco: "" });
			alert("Novo voo adicionado!");
		  } else {
			console.error("Erro ao adicionar voo");
		  }
		})
		.catch((err) => console.error("Erro no fetch:", err));
	};


  return (
    <div>
      <h2>Adicionar Voo</h2>
      <form>
        <input
          type="text"
          name="origem"
          value={voo.origem}
          onChange={handleInputChange}
          placeholder="Origem"
        />
        <input
          type="text"
          name="destino"
          value={voo.destino}
          onChange={handleInputChange}
          placeholder="Destino"
        />
        <input
          type="date"
          name="data"
          value={voo.data}
          onChange={handleInputChange}
        />
        <input
          type="time"
          name="hora"
          value={voo.hora}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="preco"
          value={voo.preco}
          onChange={handleInputChange}
          placeholder="Preço"
        />
        <button type="button" onClick={handleAddVoo}>Adicionar Voo</button>
      </form>
    </div>
  );
};

export default VooForm;
