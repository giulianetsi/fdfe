// src/componentes/Home.js
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Bem-vindo ao Conversor de Moedas</h1>
      <Button variant="primary" onClick={() => navigate('/converter')}>
        Conversor de Moedas
      </Button>{' '}
      <Button variant="primary" onClick={() => navigate('/historico')}>
        Histórico de Conversões
      </Button>{' '}
      <Button variant="primary" onClick={() => navigate('/taxas')}>
        Taxas Atuais
      </Button>
    </Container>
  );
};

export default Home;
