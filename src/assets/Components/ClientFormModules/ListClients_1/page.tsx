import { useState } from 'react';
import {  Space } from 'antd';

import './ListClients.css';
import ModalCli from '../ListClients_1/ModalCli/page'; // Importa o modal
import React from 'react';

function ListClients() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal

  const handleOpenModal = () => {
    setIsModalOpen(true); // Abre o modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Fecha o modal
  };

  const onFinish = () => {
    handleCloseModal(); // Fecha o modal após o envio
  };

  return (
    <>
      <section className="container_list_clients">
        {/* Div com botões ADICIONAR CLIENTE + MAIS OPÇÕES */}
        <div className="buttons_container">
          <button className="add_button" onClick={handleOpenModal}>
            <span> Adicionar</span>
          </button>
          <button className="more_options_button">
            <span> Mais Opções</span>
          </button>
        </div>

        {/* Div com input e botão de busca avançada */}
        <div className="search_container">
          <Space direction="horizontal" size="middle">
           
            <button className="search_button">
              Busca Avançada
            </button>
          </Space>
        </div>
      </section>

      {/* Renderiza o ModalCli e controla sua visibilidade */}
      <ModalCli 
        isModalOpen={isModalOpen} 
        handleCancel={handleCloseModal} 
        onFinish={onFinish} // Passando a função onFinish
      />
      {/* AQUI FICA O COMOPONET DO UPLOAND DA IMG */}
     
    </>
  );
}

export default ListClients;
