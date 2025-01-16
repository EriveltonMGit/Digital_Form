// IMPORT REACT ICONS
import { IoHomeSharp, IoPeopleSharp, IoSearchSharp } from "react-icons/io5";
import { FaBox } from "react-icons/fa"; // Importe o ícone que deseja usar
// import { CiViewTable } from "react-icons/ci";
// IMPORT CSS
import "./ProductsHeader.css";

// IMPORT LINK (caso esteja usando Next.js, por exemplo)
import { Link } from "react-router-dom";
import React from "react";

function ListSuppliersHeader() {
  return (
    <section className="products-form">
      <nav aria-label="breadcrumb" className="header_products">
        {/* Header Clientes */}
        <div className="area_icon_suppliers">
          <h2 className="title_list_suppliers">
            <FaBox /> {/* Ícone adicionado */}
        Lista Fornecedores
          </h2>
        </div>

        {/* OL opções */}
        <ol className="ol_suppliers">
          <li>
            <Link to="/">
              <IoHomeSharp /> Início
            </Link>
          </li>
          <p>&gt;</p>
          <li>
            <Link to="/suppliers">
              <IoPeopleSharp /> Cadastro Fornec....
            </Link>
          </li>
          <p>&gt;</p>
          <li>
            <IoSearchSharp /> Listar
          </li>
        </ol>
      </nav>

      {/*  AQUI FICA O COMPONENT */}

    </section>
  );
}

export default ListSuppliersHeader;
