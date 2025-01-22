import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, message, Input } from "antd";
import { EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { deleteProduct, setProductsData } from "../../../../redux/productsSlice";
import { RootState } from "../../../../redux/store";
import { Product } from "../../../Components/Products/types";
import EditProductModal from "../EditProductModal/EditProductModal";
import DeleteProductModal from "../DeleteProductModal/DeleteProductModal";
import "./ListProducts.css";
import CustomHeader from "../../../../Page/CustomHeader/CustomHeader";
import { IoHomeSharp, IoPeopleSharp, IoSearchSharp } from "react-icons/io5";
import { FaBox } from "react-icons/fa";

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.productsData);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleDelete = async (_id: string) => {
    try {
      const response = await fetch(
        `https://produtosform-production.up.railway.app/produtos/${_id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir o produto");
      }

      dispatch(deleteProduct(_id));
    } catch (error: unknown) {
      message.error("Erro ao excluir o produto.");
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setEditModalVisible(true);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://produtosform-production.up.railway.app/produtos");

      if (!response.ok) {
        throw new Error("Erro ao buscar os produtos");
      }

      const data = await response.json();
      dispatch(setProductsData(data));
    } catch (error) {
      message.error("Erro ao buscar os produtos.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    const searchTermLower = searchTerm.toLowerCase();
    return products.filter((product) => {
      return (
        (product.nome?.toLowerCase().includes(searchTermLower) ?? false) ||
        (product.descricao?.toLowerCase().includes(searchTermLower) ?? false) ||
        (product.categoria?.toLowerCase().includes(searchTermLower) ?? false) ||
        (product.marca?.toLowerCase().includes(searchTermLower) ?? false) ||
        (product.id?.toString().toLowerCase().includes(searchTermLower) ?? false)
      );
    });
  }, [products, searchTerm]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 20,
      render: (text: string) => (text ? text.slice(0, 6) : "N/A"),
    },
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
      width: 200,
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
      width: 300,
    },
    {
      title: "Preço (R$)",
      dataIndex: "preco",
      key: "preco",
      width: 150,
    },
    {
      title: "Quantidade",
      dataIndex: "quantidade",
      key: "quantidade",
      width: 150,
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      key: "categoria",
      width: 200,
    },
    {
      title: "Marca",
      dataIndex: "marca",
      key: "marca",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
    },
    {
      title: "Imagem",
      dataIndex: "imagem",
      key: "imagem",
      render: (url: string) => {
        if (!url) {
          return <span>Sem imagem</span>;
        }
        return <img src={url} alt="Produto" style={{ width: 50, height: 50, objectFit: "cover" }} />;
      },
    },
    {
      title: "Ações",
      key: "actions",
      render: (record: Product) => (
        <div className="container_acoes_edit">
          <Button
            className="button-edit"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            className="button-delete"
            icon={<DeleteOutlined />}
            onClick={() => {
              setSelectedProduct(record);
              setDeleteModalVisible(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <section className="container_list_products">
      <CustomHeader
        title="Lista de Produtos"
        icon={<FaBox />}
        breadcrumbs={[
          { label: "Clientes", icon: <IoHomeSharp />, link: "/clients" },
          { label: "Cadastro de Produtos", icon: <IoPeopleSharp />, link: "/register" },
          { label: "Marcas", icon: <IoSearchSharp />, link: "/brandList" },
        ]}
      />
      <div className="area_list_products">
        <Input
          placeholder="Pesquisar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input_products_list"
          prefix={<SearchOutlined />}
        />
        <button className="btn_list_products">Avançado</button>
      </div>

      <Table
        dataSource={filteredProducts}
        columns={columns}
        rowKey={(record) => record._id} // Garantindo que o "id" seja usado como a chave
        pagination={false}
        className="table_list_products"
      />

      <EditProductModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        product={selectedProduct}
        onSave={(updatedProduct) => {
          dispatch(
            setProductsData(
              products.map((p) =>
                p.id === updatedProduct.id ? updatedProduct : p
              )
            )
          );
          setEditModalVisible(false);
        }}
      />

      <DeleteProductModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onDelete={() => {
          if (selectedProduct) {
            handleDelete(String(selectedProduct.id));
          }
        }}
      />
    </section>
  );
};

export default ProductList;
