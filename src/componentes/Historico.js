// src/componentes/Historico.js
import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Historico = () => {
  const [historico, setHistorico] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarHistorico = () => {
      const historicoExistente = JSON.parse(localStorage.getItem('historicoConversoes')) || [];
      setHistorico(historicoExistente);
    };

    carregarHistorico();
  }, []);

  return (
    <Container>
      <h1>Histórico de Conversões</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Data</th>
            <th>Moeda Base</th>
            <th>Moeda Destino</th>
            <th>Quantidade</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
          {historico.map((conversao, index) => (
            <tr key={index}>
              <td>{conversao.data}</td>
              <td>{conversao.moedaBase}</td>
              <td>{conversao.moedaDestino}</td>
              <td>{conversao.quantidade}</td>
              <td>{conversao.resultado}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <Button
        variant="secondary"
        onClick={() => navigate('/')}
      >
        Voltar para Tela Inicial
      </Button>
    </Container>
  );
};

export default Historico;
