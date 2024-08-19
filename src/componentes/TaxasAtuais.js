// src/componentes/TaxasAtuais.js
import React, { useState, useEffect } from 'react';
import { Container, Form, Table, Button } from 'react-bootstrap';
import { obterTaxasDeCambio } from '../ServicoDeCambio';
import { useNavigate } from 'react-router-dom';

const TaxasAtuais = () => {
  const [moedaBase, setMoedaBase] = useState('USD');
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

  const handleMoedaBaseChange = (event) => {
    setMoedaBase(event.target.value);
  };

  return (
    <Container>
      <h1>Taxas Atuais</h1>
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
      </Form>
      
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Moeda</th>
            <th>Taxa de Câmbio</th>
          </tr>
        </thead>
        <tbody>
          {moedas.map((moeda) => (
            <tr key={moeda}>
              <td>{moeda}</td>
              <td>{taxas[moeda]}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="secondary" onClick={() => navigate('/')}>
        Voltar para Tela Inicial
      </Button>
    </Container>
  );
};

export default TaxasAtuais;
