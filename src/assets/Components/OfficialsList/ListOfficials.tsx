import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmployeesData,
  updateEmployee,
} from "../../../redux/employeesSlice";
import axios from "axios";
import { FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { message, Input } from "antd"; // Importando Input do Ant Design
import "./ListOfficials.css";
import EditEmployee from "../OfficialsList/EditOfficials/EditOfficials";
import DeleteEmployee from "../OfficialsList/DeleteOfficials/DeleteOfficials";
import React from "react";

export interface Employee {
  id: string;
  nome: string;
  tipo: string;
  situacao: string;
  telefone: string;
  celular: string;
  email: string;
  cadastradoEm: string;
  anexo?: string;
  dataAdmissao: string; // Adicionado
  idade: number;        // Adicionado
  cargo: string;        // Adicionado
}


function ListEmployees() {
  const dispatch = useDispatch();
  const employeesData = useSelector(
    (state: { employees: { employeesData: Employee[] } }) =>
      state.employees.employeesData
  );
  const [loading, setLoading] = useState(true);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3004/funcionarios");
        dispatch(setEmployeesData(response.data));
      } catch (err) {
        console.error(err);
        message.error("Erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [dispatch]);

  const handleUpdateEmployee = async (updatedEmployee: Employee) => {
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:3004/funcionarios/${updatedEmployee.id}`,
        updatedEmployee
      );
      dispatch(updateEmployee(updatedEmployee));
      setEditingEmployee(null);
      message.success("Funcionário atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      message.error("Erro ao atualizar funcionário.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteButtonClick = (employee: Employee) => {
    setEmployeeToDelete(employee);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employeesData.filter(
    (employee) =>
      employee.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.telefone.includes(searchTerm) ||
      employee.celular.includes(searchTerm)
  );

  return (
    <section className="container_list_officials">
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <>
          {editingEmployee && (
            <EditEmployee
              employee={editingEmployee}
              onClose={() => setEditingEmployee(null)}
              onSave={handleUpdateEmployee}
            />
          )}

          <DeleteEmployee
            employeeId={employeeToDelete?.id || null}
            onClose={() => setEmployeeToDelete(null)}
          />
          <div className="search_container_input">
            <Input
              placeholder="Buscar funcionário..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search_input"
              prefix={<FaSearch />}
            />
          </div>

          <table className="employees_table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Situação</th>
                <th>Telefone</th>
                <th>Celular</th>
                <th>E-mail</th>
                <th>Data de Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee: Employee, index: number) => (
                  <tr key={employee.id || index}>
                    <td>{employee.id}</td>
                    <td>{employee.nome}</td>
                    <td>{employee.tipo}</td>
                    <td>
                      {employee.situacao === "ativo" ? <FaCheck /> : "Inativo"}
                    </td>
                    <td>{employee.telefone}</td>
                    <td>{employee.celular}</td>
                    <td>{employee.email}</td>
                    <td>
                      {new Date(employee.cadastradoEm).toLocaleDateString(
                        "pt-BR"
                      )}
                    </td>
                    <td className="action_btn">
                      <button
                        className="action_button edit_button"
                        onClick={() => setEditingEmployee(employee)}
                        title="Editar funcionário"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="action_button delete_button"
                        onClick={() => handleDeleteButtonClick(employee)}
                        title="Excluir funcionário"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9}>Nenhum funcionário encontrado</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}

export default ListEmployees;
