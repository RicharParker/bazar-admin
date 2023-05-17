import "./orderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../../redux/apiCalls";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaFilePdf } from 'react-icons/fa';

export default function OrderList() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders || []);

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);


  const handleDownloadPDF = (params) => {
    const order = orders.find((p) => p._id === params.row._id);
    const doc = new jsPDF();
    doc.setProperties({
      title: `Informe de ${order.userId}`,
      author: 'Mi tienda',
    });
    doc.setFontSize(12);
    doc.text(`Detalles del ordero: ${order.userId}`, 20, 20);
    doc.autoTable({
      startY: 30,
      head: [['ID', 'Orden', 'Cantidad', 'Estatus']],
      body: [[order._id, order.userId, order.amount,order.status]],
    });
    doc.save(`Informe de ${order.userId}.pdf`);
  };


  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "userId",
      headerName: "Nombre",
      width: 200,
    },
    { field: "amount", headerName: "Cantidad", width: 200 },
    { field: "status", headerName: "Estatus", width: 200 },  
    {
      field: "Pdf",
      headerName: "Descargar PDF",
      width: 180,
      renderCell: (params) => {
        return (
          <button className="orderListDownload" onClick={() => handleDownloadPDF(params)}>
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
            <DeleteOutline
              className="orderListDelete"
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="orderList">
      {orders ? (
        <DataGrid
          rows={orders}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
        />
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
}
