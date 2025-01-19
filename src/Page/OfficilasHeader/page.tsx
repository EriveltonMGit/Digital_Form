import { useState } from 'react';
import { Space } from 'antd';

import './EmployeeActions.css'; // Ou o nome do seu arquivo CSS
import ModalEmployee from '../../assets/Components/OfficialsList/OfficialsModal/page'; // Importe o seu Modal
import React from 'react';

function EmployeeActions() {
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
      <section className="employee-actions">
        {/* Div com botões ADICIONAR FUNCIONÁRIO + MAIS OPÇÕES */}
        <div className="buttons-container">
          <button className="add-button" onClick={handleOpenModal}>
            <span>Adicionar Funcionário</span>
          </button>
          <button className="more-options-button">
            <span>Mais Opções</span>
          </button>
        </div>

        {/* Div com input e botão de busca avançada */}
        <div className="search-container">
          <Space direction="horizontal" size="middle">
            <button className="search-button">
              Busca Avançada
            </button>
          </Space>
        </div>
      </section>

      {/* Renderiza o ModalEmployee e controla sua visibilidade */}
      <ModalEmployee 
        isModalOpen={isModalOpen} 
        handleCancel={handleCloseModal} 
        onFinish={onFinish} // Passando a função onFinish
      />
    </>
  );
}

export default EmployeeActions;
