// IMPORT REACT ICONS
import { IoHomeSharp, IoPeopleSharp, IoSearchSharp } from "react-icons/io5";

// IMPORT CSS
import "./Customers.css";
import ListClients from "../../assets/Components/ClientFormModules/ListClients_1/page";
import ListClients_2 from "../../assets/Components/ClientFormModules/ListClients_2/page";

// IMPORT LINK (caso esteja usando Next.js, por exemplo)
import { Link } from "react-router-dom";  
import React from "react";

function TestBreadcrumb() {
  return (
    <section className="container_costomers">
      <nav aria-label="breadcrumb" className="header_clients">
        {/* Header Clientes */}
        <div className="area_icon_clients">
          <h2>
            Clientes <IoPeopleSharp />
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
            <Link to="/suppliers">
              <IoPeopleSharp /> Fornecedores
            </Link>
          </li>
          <p>&gt;</p>
          <li>
            <IoSearchSharp /> Listar
          </li>
        </ol>
      </nav>

      {/*  AQUI FICA O COMPONENT ListClients 1 */}
      <ListClients />
      {/* AQUI FICA O COMPONENT ListClients_2 */}
      <ListClients_2 />

    </section>
  );
}

export default TestBreadcrumb;
