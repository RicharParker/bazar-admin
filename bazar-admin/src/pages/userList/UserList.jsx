import "./userList.css";

import { Grid } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/apiCalls";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaFilePdf } from 'react-icons/fa';

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users || []);

  console.log('Users:', users); // Muestra los usuarios seleccionados en la consola

  const history = useHistory();
  

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);


  const handleDelete = async (id) => {
    const result = await Swal.fire({
      username: "¿Está seguro que desea eliminar el usuario?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminar!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const response = await deleteUser(id, dispatch);
      if (response.success !== undefined) {
        const { success, user } = response;
        if (success) {
          Swal.fire(
            "¡Eliminado!",
            "El usuario ha sido eliminado con éxito.",
            "success"
          ).then(() => {
            history.push("/users");
          });
        } else {
          Swal.fire(
            "Error",
            "No se pudo eliminar el usuario.",
            "error"
          );
        }
      } else {
        console.error("La respuesta no es válida");
      }
    }
  };


  const handleDownloadPDF = (params) => {
    const user = users.find((p) => p._id === params.row._id);
    const doc = new jsPDF();
    doc.setProperties({
      username: `Informe de ${user.username}`,
      author: 'Mi tienda',
    });
    doc.setFontSize(12);
    doc.text(`Detalles del usuario: ${user.username}`, 20, 20);
    doc.autoTable({
      startY: 30,
      head: [['ID', 'Usuario', 'Email']],
      body: [[user._id, user.username, user.email,]],
    });
    doc.save(`Informe de ${user.username}.pdf`);
  };


  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "username",
      headerName: "Usuario",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListItem">
            <img className="userListImg" src={params.row.img} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "Pdf",
      headerName: "Descargar PDF",
      width: 180,
      renderCell: (params) => {
        return (
          <button className="userListDownload" onClick={() => handleDownloadPDF(params)}>
            Descargar <FaFilePdf />
          </button>
        );
      }
    },
    {
      field: "action",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Editar</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <Link to="/newuser">
        <button className="userAddButton" >Crear usuario</button>
      </Link>
      {users.length > 0 && (
        <DataGrid
          rows={users}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
        />
      )}

    </div>
  );
} 
