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




import NotFoundPage from './Templates/NotFoundPage/page'

export default function App() {
  return (
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/suppliers" element={<SupplierForm />} />
        <Route path="/listsuppliers" element={<SupplierList />} />
        <Route path="/officials" element={<Officials />} />
        <Route path="/register" element={<ProductForm />} />
        <Route path="/productList" element={<ProductList />} />
        <Route path="/brandList" element={<BrandList />} />
        <Route path="/techcatalog" element={<TechServiceCatalog />} />
        <Route path="/servicerequesttable" element={<ServiceRequestTable serviceRequests={[]} />} />
        {/* Adicione outras rotas conforme necessário */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Provider>
  );
}