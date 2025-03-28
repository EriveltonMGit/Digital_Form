// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Routes, Route } from 'react-router-dom';
import Header from './assets/Components/Header/page';
import HomePage from './Templates/Home/page';
import ClientsPage from './Page/Customers/page';
import SupplierForm from '../src/Templates/SupplierForm/SupplierForm';
import SupplierList from '../src/assets/Components/SupplierListForm/SupplierListForm';
import Officials from '../src/Templates/Officials/page';
import ProductForm from '../src/Templates/Products/ProductForm';
import ProductList from './assets/Components/Products/ListProducts/page';
import BrandList from './Templates/Brands/BrandList';
import TechServiceCatalog from './Templates/ServiceCatalog/TechService';
import ServiceRequestTable from './assets/Components/TechService/ServiceRequestTable/ServiceRequestTable';
import BudgetForm from './Templates/BudgetForm/BudgetForm';
import ManageBudgets from './assets/Components/ManageBudgets/ManageBudgets';
import AccountsPayable from './Templates/FinancialBalance/FinancialBalance';
import AccountsReceivable from './Templates/AccountsReceivable/AccountsReceivable';
import ProductsInStock from './Templates/ProductsInStock/ProductsInStock';
import StockAdjustment from './Templates/StockAdjustment/StockAdjustment';
import OrdemServicoForm from './Templates/OrdemServicoForm/OrdemServicoForm';
import ListaOrdensServico from './Templates/ListaOrdensServico/ListaOrdensServico';
import SalesOrderForm from './Templates/SalesOrderForm/SalesOrderForm';
import SalesOrderTable from './Templates/SalesOrder/SalesOrder';
import NoteComponent from './assets/Components/NoteComponent/NoteComponent';
import InvoiceConsultation from './assets/Components/NoteComponent/NoteSearchComponent/NotesTable';




import NotFoundPage from './Templates/NotFoundPage/page'
import PreferencesSettings from './assets/Components/PreferencesSettings/PreferencesSettings'

export default function App() {
  
  return (
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clientes" element={<ClientsPage />} />
        <Route path="/suppliers" element={<SupplierForm />} />
        <Route path="/listsuppliers" element={<SupplierList />} />
        <Route path="/officials" element={<Officials />} />
        <Route path="/register" element={<ProductForm />} />
        <Route path="/productList" element={<ProductList />} />
        <Route path="/brandList" element={<BrandList />} />
        <Route path="/techcatalog" element={<TechServiceCatalog />} />
        <Route path="/servicerequesttable" element={<ServiceRequestTable />} />
        <Route path="/budgetform" element={<BudgetForm />} />
        <Route path="/BudgetTable" element={<ManageBudgets />} />
        <Route path="/OrdemServicoForm" element={<OrdemServicoForm />} />
        <Route path="/ListaOrdensServico" element={<ListaOrdensServico />} />
        <Route path="/SalesOrderForm" element={<SalesOrderForm />} />
        <Route path="/SalesOrderTable" element={<SalesOrderTable />} />
        <Route path="/NoteComponent" element={<NoteComponent />} />
        <Route path="/InvoiceConsultation" element={<InvoiceConsultation invoices={[]} />} />






        <Route path="/ProductsInStock" element={<ProductsInStock />} />
        <Route path="/StockAdjustment" element={<StockAdjustment />} />

        <Route path="/AccountsReceivable" element={<AccountsReceivable />} />
        <Route path="/AccountsPayable" element={<AccountsPayable />} />

        {/* Adicione outras rotas conforme necessário */}
        <Route path="/PreferencesSettings" element={<PreferencesSettings />} />
        <Route path="*" element={<NotFoundPage />} />
        
        
      </Routes>
    </Provider>
  );
}