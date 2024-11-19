import React, { useState } from 'react';
import VoosList from './VoosList';
import VooForm from './VooForm';

const VoosPage = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [refreshList, setRefreshList] = useState(false);

  const handleSave = () => {
    setRefreshList(!refreshList); // Atualiza a lista após salvar
    setActiveTab('list'); // Volta para a aba de lista
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gerenciamento de Voos</h1>
      <div style={styles.tabContainer}>
        <button
          style={activeTab === 'list' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('list')}
        >
          Lista de Voos
        </button>
        <button
          style={activeTab === 'form' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('form')}
        >
          Adicionar Voo
        </button>
      </div>

      <div style={styles.content}>
        {activeTab === 'list' && <VoosList refresh={refreshList} />}
        {activeTab === 'form' && <VooForm onSave={handleSave} />}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  tab: {
    padding: '10px 20px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#eee',
    cursor: 'pointer',
    fontSize: '16px',
  },
  activeTab: {
    padding: '10px 20px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#6200ea',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
  },
  content: {
    padding: '20px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
};

export default VoosPage;
