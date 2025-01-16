// IMPORT REACT ICONS
import { IoHomeSharp, IoPeopleSharp, IoSearchSharp } from "react-icons/io5";
import { FaBox } from "react-icons/fa"; // Importe o ícone que deseja usar
// IMPORT CSS
import "./ProductsHeader.css";

// IMPORT LINK (caso esteja usando Next.js, por exemplo)
import { Link } from "react-router-dom";
import React from "react";

function ProductsHeader() {
  return (
    <section className="products-form">
      <nav aria-label="breadcrumb" className="header_products">
        {/* Header Clientes */}
        <div className="area_icon_products">
          <h2 className="title_list_products">
            <FaBox /> {/* Ícone adicionado */}
            Produtos Cadastrados
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
            <Link to="/register">
              <IoPeopleSharp /> Cadastro Produtos
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

export default ProductsHeader;
