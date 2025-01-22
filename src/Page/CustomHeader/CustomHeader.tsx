import React from "react";
import { Link } from "react-router-dom";
import { Input } from "antd";
import "./CustomHeader.css";

interface BreadcrumbItem {
  label: string;
  icon?: React.ReactNode;
  link?: string;
}

interface CustomHeaderProps {
  title: string;
  icon?: React.ReactNode;
  breadcrumbs: BreadcrumbItem[];
  className?: string;
  showSearch?: boolean; // Propriedade para mostrar o campo de pesquisa
  onSearch?: (value: string) => void; // Callback para tratar a pesquisa
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  icon,
  breadcrumbs,
  className,
  showSearch = false, // Por padrão, o campo de pesquisa não aparece
  onSearch,
}) => {
  return (
    <section className={`custom-header ${className}`}>
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

        {/* Campo de Pesquisa */}
        {showSearch && (
          <div className="header-search">
            <Input.Search
              placeholder="Pesquisar em todo o sistema"
              allowClear
              onSearch={onSearch}
              style={{ width: "300px" }}
            />
          </div>
        )}
      </nav>
    </section>
  );
};

export default CustomHeader;
