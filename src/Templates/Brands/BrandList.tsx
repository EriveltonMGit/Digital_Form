import React, { useState, useMemo, useEffect } from "react";
import { Table, Input, Spin, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store"; // Importando AppDispatch
import { fetchProducts } from "../../redux/productsSlice";
import "./ListBrands.css";
import CustomHeader from "../../Page/CustomHeader/CustomHeader";
import { IoHomeSharp, IoPeopleSharp, IoSearchSharp } from "react-icons/io5";
import { TbBrandStackshare } from "react-icons/tb";
const BrandList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Tipando dispatch corretamente
  const products = useSelector(
    (state: RootState) => state.products.productsData
  );
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts()); // Disparando a ação corretamente
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    if (error) {
      message.error(error); // Exibe uma mensagem de erro caso ocorra
    }
  }, [error]);

  const uniqueBrands = useMemo(() => {
    const brands = products
      .map((product) => product.marca)
      .filter((marca) => marca && marca.trim() !== "");
    return Array.from(new Set(brands)); // Remove marcas duplicadas
  }, [products]);

  const dataSource = useMemo(() => {
    return uniqueBrands.map((marca) => {
      const productsOfBrand = products.filter(
        (product) => product.marca === marca
      );

      const totalQuantidade = productsOfBrand.reduce(
        (total, product) => total + (product.quantidade || 0),
        0
      );
      const totalPreco = productsOfBrand.reduce(
        (total, product) => total + (product.preco || 0),
        0
      );
      const precoMedio = productsOfBrand.length
        ? (totalPreco / productsOfBrand.length).toFixed(2)
        : "0.00";

      return {
        nome: marca,
        imagem: productsOfBrand[0]?.imagem || "",
        descricao: productsOfBrand[0]?.descricao || "",
        totalQuantidade,
        precoMedio,
      };
    });
  }, [uniqueBrands, products]);

  const filteredBrands = useMemo(() => {
    const searchTermLower = searchTerm.toLowerCase();
    return dataSource.filter((brand) =>
      brand.nome.toLowerCase().includes(searchTermLower)
    );
  }, [dataSource, searchTerm]);

  const columns = [
    {
      title: "Marca",
      dataIndex: "nome",
      key: "nome",
      render: (nome: string) => <span>{nome}</span>,
    },
    {
      title: "Imagem",
      dataIndex: "imagem",
      key: "imagem",
      render: (imagem: string | File) => {
        if (typeof imagem === "string") {
          return (
            <img
              src={imagem}
              alt="Marca"
              style={{ width: 50, height: 50, objectFit: "cover" }}
            />
          );
        } else {
          return <span>Imagem inválida</span>;
        }
      },
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
      render: (descricao: string) => <span>{descricao}</span>,
    },
    {
      title: "Quantidade em Estoque",
      key: "quantidade",
      render: (_: any, record: { totalQuantidade: number }) => {
        return <span>{record.totalQuantidade}</span>;
      },
    },
    {
      title: "Preço Médio (R$)",
      key: "precoMedio",
      render: (_: any, record: { precoMedio: string }) => {
        return <span>{record.precoMedio}</span>;
      },
    },
  ];

  return (
    <section className="container_list_brands">
      {/* header  */}
      <CustomHeader
        title="Marcas de Produtos"
        icon={<TbBrandStackshare />}
        breadcrumbs={[
          { label: "Clientes", icon: <IoHomeSharp />, link: "/clients" },
          { label: "Lista de Produ...", icon: <IoPeopleSharp />, link: "/productList" },
          { label: "Listar", icon: <IoSearchSharp /> },
        ]}
      />

      <div className="search_area">
        <Input
          placeholder="Pesquisar marcas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input_brands_list"
          prefix={<SearchOutlined />}
        />
      </div>

      {loading ? (
        <Spin size="large" className="loading_spinner" />
      ) : (
        <Table
          dataSource={filteredBrands}
          columns={columns}
          rowKey="nome"
          pagination={false}
          className="table_list_brands"
        />
      )}
    </section>
  );
};

export default BrandList;
