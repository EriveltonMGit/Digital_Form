import React from 'react';

import { Link } from 'react-router-dom'; // Certifique-se de ter o react-router-dom instalado
import {
  FiHome, FiUser, FiBox, FiTool, FiFileText, FiClipboard, FiShoppingCart, FiLayers,
  FiDollarSign, FiFile, FiFilePlus, FiPhone, FiCalendar, FiBarChart2, FiSettings
} from 'react-icons/fi';
import './Header.css'; // Arquivo de estilos personalizado
import { Menu } from 'antd';
import 'antd/dist/reset.css'; // Estilos resetados do Ant Design


function Header() {
  const menuItems = [
    {
      key: 'home',
      icon: <FiHome />,
      label: <Link to="/">Início</Link>,
    },
    {
      key: 'sub1',
      icon: <FiUser />,
      label: 'Cadastros',
      children: [
        { key: '1', label: <Link to="/clientes">Clientes</Link> },
        { key: '2', label: <Link to="/suppliers">Cadastro de Fornecedores</Link> },
        { key: '3', label: <Link to="/listsuppliers"> Fornecedores</Link> },
        { key: '4', label: <Link to="/officials">Funcionários</Link> },
      ],
    },
    {
      key: 'sub2',
      icon: <FiBox />,
      label: 'Produtos',
      children: [
        { key: '5', label: <Link to="/register">Cadastro de Produtos</Link> },
        { key: '6', label: <Link to="/productList">Lista de Produtos</Link> },
        { key: '7', label: <Link to="/brandList">Marcas</Link> },
      ],
    },
    {
      key: 'sub3',
      icon: <FiTool />,
      label: 'Serviços',
      children: [
        { key: '8', label: <Link to="/techcatalog">Catálogo</Link> },
        { key: '9', label: <Link to="/servicerequesttable">Tipos de Serviços</Link> },
      ],
    },
    {
      key: 'sub4',
      icon: <FiFileText />,
      label: 'Orçamentos',
      children: [
        { key: '10', label: <Link to="/budgetform">Criar Orçamento</Link> },
        { key: '11', label: <Link to="/BudgetTable">Gerenciar Orçamentos</Link> },
      ],
    },
    {
      key: 'sub5',
      icon: <FiClipboard />,
      label: 'Ordens de Serviços',
      children: [
        { key: '12', label: <Link to="/OrdemServicoForm">Criar Ordem</Link> },
        { key: '13', label: <Link to="/ListaOrdensServico">Histórico de Ordens</Link> },
      ],
    },
    {
      key: 'sub6',
      icon: <FiShoppingCart />,
      label: 'Vendas',
      children: [
        { key: '14', label: <Link to="/SalesOrderForm">Pedidos</Link> },
        { key: '15', label: <Link to="/SalesOrderTable">Histórico</Link> },
      ],
    },
    {
      key: 'sub7',
      icon: <FiLayers />,
      label: 'Estoque',
      children: [
        { key: '16', label: <Link to="/ProductsInStock">Produtos em Estoque</Link> },
        { key: '17', label: <Link to="/StockAdjustment">Ajustes de Estoque</Link> },
      ],
    },
    {
      key: 'sub8',
      icon: <FiDollarSign />,
      label: 'Financeiro',
      children: [
        { key: '18', label: <Link to="/AccountsPayable">Contas a Pagar</Link> },
        { key: '19', label: <Link to="/AccountsReceivable">Contas a Receber</Link> },
      ],
    },
    {
      key: 'sub9',
      icon: <FiFile />,
      label: 'Notas Fiscais',
      children: [
        { key: '20', label: <Link to="/NoteComponent">Emitir Nota</Link> },
        { key: '21', label: <Link to="/InvoiceConsultation">Consultar Notas</Link> },
      ],
    },
    {
      key: 'sub10',
      icon: <FiFilePlus />,
      label: 'Contratos',
      children: [
        { key: '22', label: <Link to="/Templates/CreateContract">Criar Contrato</Link> },
        { key: '23', label: <Link to="/Templates/ContractHistory">Histórico de Contratos</Link> },
      ],
    },
    {
      key: 'sub11',
      icon: <FiPhone />,
      label: 'Atendimento',
      children: [
        { key: '24', label: <Link to="/Templates/SupportTickets">Chamados</Link> },
        { key: '25', label: <Link to="/Templates/TicketHistory">Histórico de Chamados</Link> },
      ],
    },
    {
      key: 'sub12',
      icon: <FiCalendar />,
      label: 'Agenda',
      children: [
        { key: '26', label: <Link to="/Templates/Events">Eventos</Link> },
        { key: '27', label: <Link to="/Templates/Appointments">Compromissos</Link> },
      ],
    },
    {
      key: 'sub13',
      icon: <FiBarChart2 />,
      label: 'Relatórios',
      children: [
        { key: '28', label: <Link to="/Templates/SalesReports">Relatórios de Vendas</Link> },
        { key: '29', label: <Link to="/Templates/StockReports">Relatórios de Estoque</Link> },
      ],
    },
    {
      key: 'sub14',
      icon: <FiSettings />,
      label: 'Configurações',
      children: [
        { key: '30', label: <Link to="/PreferencesSettings">Preferências</Link> },
        { key: '31', label: <Link to="/Templates/UserPermissions">Usuários e Permissões</Link> },
      ],
    },
  ];
  

  return (
    <section className="header_">
      {/* LOGO DA EMPRESA */}
      <div className="logo_">
        <h3>Logo</h3>
      </div>

      {/* MENU USANDO ANT DESIGN */}
      <Menu mode="vertical" theme="light" items={menuItems} className="menu_ul" />
    </section>
  );
}

export default Header;
