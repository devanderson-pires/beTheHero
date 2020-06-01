import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e) {

    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    }

    try {

      const res = await api.post('/ongs', data);
  
      alert(`Seu ID de acesso: ${res.data.id}`);
      history.push('/');
    } catch (erro) {

      alert('Erro no cadastro, tente novamente')
    };
  };
  
  return (
    <div className="container">
      <div className="content">
        <section>
          <img src={logoImg} alt=""/>

          <h2>Cadastro</h2>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para o logon
          </Link>

        </section>

        <form onSubmit={ handleRegister }>
          <label className="form-label" htmlFor="name">Nome da ONG</label>
          <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} />

          <label className="form-label" htmlFor="email">E-mail</label>
          <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />

          <label className="form-label" htmlFor="whatsapp">WhatsApp</label>
          <input id="whatsapp" type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />

          <div className="input-group">
            <div>
              <label className="form-label" htmlFor="city">Cidade</label>
              <input id="city" type="text" value={city} onChange={e => setCity(e.target.value)} />
            </div>

            <div>
              <label className="form-label" htmlFor="uf">UF</label>
              <input id="uf" type="text" style={{ width: 80 }} value={uf} onChange={e => setUf(e.target.value)}/>
            </div>
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};
