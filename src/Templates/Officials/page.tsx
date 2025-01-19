// IMPORT REACT ICONS
import { IoHomeSharp, IoPeopleSharp, IoSearchSharp } from "react-icons/io5";

// IMPORT CSS
import "./Officials.css";

// IMPORT LINK (caso esteja usando Next.js, por exemplo)
import { Link } from "react-router-dom";
import React from "react";
import EmployeeActions from "../../Page/OfficilasHeader/page";
import ListOfficials from "../../assets/Components/OfficialsList/ListOfficials";

function Officials() {
  return (
    <section className="container_officials">
      <nav aria-label="breadcrumb" className="header_officials">
        {/* Header Clientes */}
        <div className="area_icon_officials">
          <h2>
            Funcionários <IoPeopleSharp />
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

      <EmployeeActions />

      {/* aqui fica a atebla coms  lista de funcionarios */}
      <ListOfficials />
    </section>
  );
}

export default Officials;
