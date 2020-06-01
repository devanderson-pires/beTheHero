import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function NewIncident() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e) {

    e.preventDefault();

    const data = {
      title,
      description,
      value
    }

    try {

      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      });

      history.push('/profile');
    } catch (erro) {

      alert('Erro ao cadastrar caso, tente novamente');
    };
  };
  
  return (
    <div className="container">
      <div className="content">
        <section>
          <img src={logoImg} alt=""/>

          <h2>Cadastrar novo caso</h2>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>

        </section>

        <form onSubmit={ handleNewIncident }>
          <label className="form-label" htmlFor="casoTitle">Título do caso</label>
          <input id="casoTitle" type="text" value={title} onChange={e => setTitle(e.target.value)} />

          <label className="form-label" htmlFor="casoDesc">Descrição</label>
          <textarea id="casoDesc" value={description} onChange={e => setDescription(e.target.value)}></textarea>

          <label className="form-label" htmlFor="casoValor">Valor em reais</label>
          <input id="casoValor" type="text" value={value} onChange={e => setValue(e.target.value)}/>
          
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};
