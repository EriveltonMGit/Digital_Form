// IMPORT REACT ICONS
import { IoHomeSharp, IoPeopleSharp, IoSearchSharp } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
// IMPORT CSS
import "./RegisterProductsHeader.css";

// IMPORT LINK (caso esteja usando Next.js, por exemplo)
import { Link } from "react-router-dom";
import React from "react";

function RegisterProductsHeader() {
  return (
    <section className="products-form">
      <nav aria-label="breadcrumb" className="header_products">
        {/* Header Clientes */}
        <div className="area_icon_products">
        <h2 className="title_register_products">
        <FaPlusCircle />
        Cadastro de Produto
      </h2>
        </div>

        {/* OL opções */}
        <ol>
          <li>
            <Link to="/">
              <IoHomeSharp /> Início
            </Link>
          </li>
          <p>&gt;</p>
          <li>
            <Link to="/productList">
              <IoPeopleSharp /> Lista de Produtos
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

export default RegisterProductsHeader;
