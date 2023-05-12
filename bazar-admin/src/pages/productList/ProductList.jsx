import "./productList.css";
import { Grid } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaFilePdf } from 'react-icons/fa';

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const history = useHistory();

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);


  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Está seguro que desea eliminar el producto?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminar!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const response = await deleteProduct(id, dispatch);
      if (response.success !== undefined) {
        const { success, product } = response;
        if (success) {
          Swal.fire(
            "¡Eliminado!",
            "El producto ha sido eliminado con éxito.",
            "success"
          ).then(() => {
            history.push("/products");
          });
        } else {
          Swal.fire(
            "Error",
            "No se pudo eliminar el producto.",
            "error"
          );
        }
      } else {
        console.error("La respuesta no es válida");
      }
    }
  };


  const handleDownloadPDF = (params) => {
    const product = products.find((p) => p._id === params.row._id);
    const doc = new jsPDF();
    doc.setProperties({
      title: `Informe de ${product.title}`,
      author: 'Mi tienda',
    });
    doc.setFontSize(12);
    doc.text(`Detalles del producto: ${product.title}`, 20, 20);
    doc.autoTable({
      startY: 30,
      head: [['ID', 'Producto', 'Stock', 'Precio']],
      body: [[product._id, product.title, product.inStock, product.price]],
    });
    doc.save(`Informe de ${product.title}.pdf`);
  };


  const columns = [
    //{ field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Producto",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Precio",
      width: 160,
    },
    {
      field: "Pdf",
      headerName: "Descargar PDF",
      width: 180,
      renderCell: (params) => {
        return (
          <button className="productListDownload" onClick={() => handleDownloadPDF(params)}>
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
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Editar</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <Link to="/newproduct">
        <button className="userAddButton" >Crear Producto</button>
      </Link>
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
      />
    </div>
  );
} 
