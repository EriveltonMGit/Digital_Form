import React from "react";

import { Link } from "react-router-dom";
import "./CustomHeader.css";

interface BreadcrumbItem {
  label: string;
  icon?: React.ReactNode;
  link?: string; // Opcional: se não for fornecido, será apenas texto
}

interface CustomHeaderProps {
  title: string;
  icon?: React.ReactNode;
  breadcrumbs: BreadcrumbItem[];
  className?: string; // Adicionando className aqui
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, icon, breadcrumbs, className }) => {
  return (
    <section className={`custom-header ${className}`}> {/* Usando a className aqui */}
      <nav aria-label="breadcrumb" className="header-content">
        {/* Título com Ícone */}
        <div className="header-title">
          <h2>
            {icon} {title}
          </h2>
        </div>

        {/* Breadcrumb */}
        <ol className="breadcrumb">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              {item.link ? (
                <li>
                  <Link to={item.link}>
                    {item.icon} {item.label}
                  </Link>
                </li>
              ) : (
                <li>
                  {item.icon} {item.label}
                </li>
              )}
              {index < breadcrumbs.length - 1 && <p>&gt;</p>}
            </React.Fragment>
          ))}
        </ol>
      </nav>
    </section>
  );
};

export default CustomHeader;


