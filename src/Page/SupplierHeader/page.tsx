// IMPORT REACT ICONS
import { IoSearchSharp } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import { CiViewTable } from "react-icons/ci";
// IMPORT CSS
import "./SupplierHeader.css";

// IMPORT LINK (caso esteja usando Next.js, por exemplo)
import { Link } from "react-router-dom";
import React from "react";

function SupplierHeader() {
  return (
    <section className="supplier-form">
      <nav aria-label="breadcrumb" className="header_supplier">
        {/* Header Clientes */}
        <div className="area_register_supplier">
          <h2 className="title_register_supplier">
            <FaPlusCircle />
            Cadastro de Fornecedor
          </h2>
        </div>

        {/* OL opções */}
        <ol>
          <li>
            <Link to="/clients">
            <FaHouseUser />Clientes
            </Link>
          </li>
          <p>&gt;</p>
          <li>
            <Link to="/listsuppliers">
            <CiViewTable />Lista Forne..
            </Link>
          </li>
          <p>&gt;</p>
          <li>
            <IoSearchSharp /> Listar 
          </li>
        </ol>
      </nav>
    </section>
  );
}

export default SupplierHeader;
