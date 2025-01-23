import React from "react";
import {  Calendar } from "antd";
import  { Dayjs } from "dayjs"; 
import "./FinancialDashboard.css";

const Calendarry: React.FC = () => {
 

  const columns = [
    {
      title: "Data",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Valor",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  // Função para lidar com a seleção de datas no calendário
  const onSelect = (date: Dayjs) => {
    // Usando Dayjs em vez de Moment
    console.log("Data selecionada:", date.format("YYYY-MM-DD"));
    // Adicione a lógica que você precisa ao selecionar uma data
  };

  return (
  
     
      <div className="calendario_">
        <Calendar fullscreen={false} onSelect={onSelect} />
      </div>
    
  );
};

export default Calendarry;
