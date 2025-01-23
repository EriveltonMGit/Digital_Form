import React, { useState, useEffect } from "react";
import "./Home.css";
import FinancialDashboard from "../../assets/Components/DashBoardFinancial/FinancialDashboard";
import CustomHeader from "../../Page/CustomHeader/CustomHeader";
import { AiFillDashboard } from "react-icons/ai";
import CashFlowChart from "../../assets/Components/DashBoardFinancial/CashFlowChart";
import RecentTransactions from "../../assets/Components/DashBoardFinancial/RecentTransactions";
import ProductDashboard from "../../assets/Components/DashBoardFinancial/ProductDashboard";
import { Skeleton } from "antd"; // Importando o Skeleton
import Calendarry from "../../assets/Components/DashBoardFinancial/Calendar";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando o carregamento de dados
    setTimeout(() => {
      setLoading(false); // Dados carregados após 2 segundos
    }, 2000); // Você pode ajustar o tempo de espera aqui
  }, []);

  return (
    <>
      <section className="container_home_page">
        <CustomHeader
          title="Olá, seja bem-vindo(a)"
          icon={<AiFillDashboard />}
          breadcrumbs={[]}
        />

        {loading ? (
          <>
            <div className="container_loading">
              <Skeleton active paragraph={{ rows: 2 }} />
              <Skeleton active paragraph={{ rows: 4 }} />
              <Skeleton active paragraph={{ rows: 2 }} />
            </div>
          </>
        ) : (
          <>
            <FinancialDashboard />
            <CashFlowChart />
            <RecentTransactions />
            <ProductDashboard />
            <Calendarry/>
            
          </>
        )}
      </section>
    </>
  );
}

export default Home;
