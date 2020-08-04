import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Profile() {

  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {

    api.get('/profile',{

      headers: {
        Authorization: ongId,
      }
    })
    .then(res => setIncidents(res.data));
  }, [ongId]);

  async function handleDeleteIncident(id) {

    try {
      await api.delete(`/incidents/${id}`, {

        headers: {
          Authorization: ongId,
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (erro) {

      alert('Erro ao deletar caso, tente novamente');
    };
  };

  function handleLogout() {

    localStorage.clear();
    history.push('/');
  };

  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="" />
        <span>Bem vindo, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={ handleLogout } >
          <FiPower size={18} color="#e02041"/>
        </button>
      </header>

      <h2>Casos cadastrados</h2>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>Descrição</strong>
            <p>{incident.description}</p>

            <strong>Valor:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button onClick={ () => handleDeleteIncident(incident.id) } >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};