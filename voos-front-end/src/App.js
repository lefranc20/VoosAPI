import React, { useState, useEffect } from "react";

const App = () => {
  const [voos, setVoos] = useState([]);
  const [voo, setVoo] = useState({ origem: "", destino: "", data: "", hora: "", preco: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingVooId, setEditingVooId] = useState(null);
  const [activeTab, setActiveTab] = useState("lista");

  useEffect(() => {
    fetch("http://localhost:8080/sistema/voos")
      .then((res) => res.json())
      .then((data) => setVoos(data))
      .catch((err) => console.error("Erro ao buscar voos:", err));
  }, []);

  const handleAddVoo = () => {
    fetch("http://localhost:8080/sistema/voo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(voo),
    })
      .then(() => {
        setVoos([...voos, voo]);
        setVoo({ origem: "", destino: "", data: "", hora: "", preco: "" });
      })
      .catch((err) => console.error(err));
  };

  const handleEditVoo = (id) => {
    const vooToEdit = voos.find((v) => v.id === id);
    setVoo(vooToEdit);
    setIsEditing(true);
    setEditingVooId(id);
    setActiveTab("adicionar");
  };

  const handleUpdateVoo = () => {
    fetch(`http://localhost:8080/sistema/voo/${editingVooId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(voo),
    })
      .then(() => {
        setVoos(voos.map((v) => (v.id === editingVooId ? voo : v)));
        setIsEditing(false);
        setVoo({ origem: "", destino: "", data: "", hora: "", preco: "" });
        setEditingVooId(null);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteVoo = (id) => {
    fetch(`http://localhost:8080/sistema/voo/${id}`, { method: "DELETE" })
      .then(() => setVoos(voos.filter((v) => v.id !== id)))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => setVoo({ ...voo, [e.target.name]: e.target.value });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gerenciamento de Voos</h1>
      <div style={styles.tabs}>
        <button
          style={activeTab === "lista" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("lista")}
        >
          Lista de Voos
        </button>
        <button
          style={activeTab === "adicionar" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("adicionar")}
        >
          {isEditing ? "Editar Voo" : "Adicionar Voo"}
        </button>
      </div>
      {activeTab === "lista" && (
        <div style={styles.content}>
          <h2>Lista de Voos</h2>
          <ul style={styles.list}>
            {voos.map((v) => (
              <li key={v.id} style={styles.listItem}>
                {v.origem} → {v.destino} | {v.data} | {v.hora} | R${v.preco}
                <button onClick={() => handleEditVoo(v.id)} style={styles.editButton}>
                  Editar
                </button>
                <button onClick={() => handleDeleteVoo(v.id)} style={styles.deleteButton}>
                  Deletar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {activeTab === "adicionar" && (
        <div style={styles.content}>
          <h2>{isEditing ? "Editar Voo" : "Adicionar Voo"}</h2>
          <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
            <label style={styles.label}>
              Origem:
              <input
                type="text"
                name="origem"
                value={voo.origem}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Destino:
              <input
                type="text"
                name="destino"
                value={voo.destino}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Data:
              <input
                type="date"
                name="data"
                value={voo.data}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Hora:
              <input
                type="time"
                name="hora"
                value={voo.hora}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Preço:
              <input
                type="number"
                name="preco"
                value={voo.preco}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
            <button
              onClick={isEditing ? handleUpdateVoo : handleAddVoo}
              style={styles.submitButton}
            >
              {isEditing ? "Atualizar Voo" : "Adicionar Voo"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    textAlign: "center",
    maxWidth: "600px",
    margin: "0 auto",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  tabs: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
  tab: {
    padding: "10px 20px",
    border: "1px solid #007bff",
    backgroundColor: "#f8f9fa",
    cursor: "pointer",
    borderRadius: "5px",
  },
  activeTab: {
    padding: "10px 20px",
    border: "1px solid #007bff",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "5px",
  },
  content: {
    marginTop: "20px",
    textAlign: "left",
  },
  list: {
    padding: "0",
    listStyle: "none",
  },
  listItem: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#ffc107",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
    marginLeft: "10px",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
    marginLeft: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginTop: "5px",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    alignSelf: "center",
    marginTop: "10px",
  },
};

export default App;
