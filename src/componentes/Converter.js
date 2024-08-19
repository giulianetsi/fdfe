// src/componentes/Converter.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { obterTaxasDeCambio } from '../ServicoDeCambio';
import { useNavigate } from 'react-router-dom';

const Converter = () => {
  const [moedaBase, setMoedaBase] = useState('USD');
  const [moedaDestino, setMoedaDestino] = useState('EUR');
  const [quantidade, setQuantidade] = useState(1);
  const [resultado, setResultado] = useState(null);
  const [taxas, setTaxas] = useState({});
  const [moedas, setMoedas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const carregarTaxas = async () => {
      try {
        const taxasDeCambio = await obterTaxasDeCambio(moedaBase);
        setTaxas(taxasDeCambio);
        setMoedas(Object.keys(taxasDeCambio));
      } catch (error) {
        console.error('Erro ao carregar taxas:', error);
      }
    };
    carregarTaxas();
  }, [moedaBase]);

  useEffect(() => {
    if (taxas[moedaDestino]) {
      setResultado((quantidade * taxas[moedaDestino]).toFixed(2));
    }
  }, [quantidade, moedaDestino, taxas]);

  const handleMoedaBaseChange = (event) => {
    setMoedaBase(event.target.value);
  };

  const handleMoedaDestinoChange = (event) => {
    setMoedaDestino(event.target.value);
  };

  const handleQuantidadeChange = (event) => {
    setQuantidade(event.target.value);
  };

  const salvarHistorico = () => {
    const conversao = {
      moedaBase,
      moedaDestino,
      quantidade,
      resultado,
      data: new Date().toLocaleString(),
    };
    const historicoExistente = JSON.parse(localStorage.getItem('historicoConversoes')) || [];
    localStorage.setItem('historicoConversoes', JSON.stringify([conversao, ...historicoExistente]));
  };

  return (
    <Container>
      <h1>Conversor de Moeda</h1>
      <Form>
        <Form.Group controlId="formBaseCurrency">
          <Form.Label>Moeda Base</Form.Label>
          <Form.Control as="select" value={moedaBase} onChange={handleMoedaBaseChange}>
            {moedas.map((moeda) => (
              <option key={moeda} value={moeda}>
                {moeda}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formDestinationCurrency">
          <Form.Label>Moeda Destino</Form.Label>
          <Form.Control as="select" value={moedaDestino} onChange={handleMoedaDestinoChange}>
            {moedas.map((moeda) => (
              <option key={moeda} value={moeda}>
                {moeda}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formQuantity">
          <Form.Label>Quantidade</Form.Label>
          <Form.Control type="number" value={quantidade} onChange={handleQuantidadeChange} />
        </Form.Group>

        <Button
          variant="primary"
          type="button"
          onClick={() => {
            setResultado((quantidade * taxas[moedaDestino]).toFixed(2));
            salvarHistorico();
          }}
        >
          Converter
        </Button>
        
        <Button
          variant="secondary"
          className="mt-3"
          onClick={() => navigate('/')}
        >
          Voltar para Tela Inicial
        </Button>
      </Form>

      {resultado && (
        <Alert variant="success">
          {quantidade} {moedaBase} é igual a {resultado} {moedaDestino}.
        </Alert>
      )}
    </Container>
  );
};

export default Converter;
