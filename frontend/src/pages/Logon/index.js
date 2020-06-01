import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import api from '../../services/api';

export default function Logon() {

  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {

    e.preventDefault();

    try {

      const res = await api.post('/sessions', { id });
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', res.data.name);
      history.push('/profile');
    } catch (erro) {

      alert('Falha no login, tente novamente');
    };
  };

  return(
    <div className="container">
      <section className="form">
        <img src={logoImg} alt=""/>

        <form onSubmit={ handleLogin }>
          <h2 className="form__title">Faça seu logon</h2>

          <label className="form-label" htmlFor="id">Sua <abbr title="Identity" lang="en">ID</abbr></label>
          <input id="id" value={id} onChange={e => setId(e.target.value)} />

          <button className="button" type="submit">Entrar</button>

          <Link className="link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img className="form__heroesImg" src={heroesImg} alt=""/>
    </div>
  );
};
