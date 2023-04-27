import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Product() {
  const [inputs, setInputs] = useState({});
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const toastContainerStyle = {
    fontSize: '1.5rem',
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: '10px',
    padding: '1rem',
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleUpdateClick = async (e, id) => {
    e.preventDefault();
    const updatedProduct = { ...inputs, categories: cat };
    const { success, product } = await updateProduct(id, updatedProduct, dispatch);
    if (success) {
      toast.success("Producto actualizado exitosamente");
      history.push("/products");
    } else {
      toast.error("No se pudo actualizar el producto");
    }
  };
  
  

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick={false}
        pauseOnHover={false}
        toastContainerStyle={toastContainerStyle}

      />
      <div className="product">
        <div className="productTitleContainer">
          <h1 className="productTitle">Producto</h1>
          <Link to="/newproduct">
            <button className="productAddButton">Crear Producto</button>
          </Link>
        </div>
        <div className="productTop">
          <div className="productTopLeft">
            <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
          </div>
          <div className="productTopRight">
            <div className="productInfoTop">
              <img src={product.img} alt="" className="productInfoImg" />
              <span className="productName">{product.title}</span>
            </div>
            <div className="productInfoBottom">
              <div className="productInfoItem">
                <span className="productInfoKey">id:</span>
                <span className="productInfoValue">{product._id}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">sales:</span>
                <span className="productInfoValue">5123</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">in stock:</span>
                <span className="productInfoValue">{product.inStock}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="productBottom">
          <form className="productForm">
            <div className="productFormLeft">
              <label>Nombre del producto</label>
              <input type="text" placeholder={product.title} onChange={handleChange}/>
              <label>Descripción</label>
              <input type="text" placeholder={product.desc} onChange={handleChange} />
              <label>Precio</label>
              <input type="text" placeholder={product.price}onChange={handleChange}  />
              <label>Categorias</label>
              <input type="text" placeholder={product.categories} onChange={handleCat} />
              <label>In Stock</label>
              <select name="inStock" id="idStock" onChange={handleChange} >
                <option value="true">Si</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="productFormRight">
              <div className="productUpload">
                <img src={product.img} alt="" className="productUploadImg" />
                <label htmlFor="file">
                  <Publish />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="productButton"  onClick={(e) => handleUpdateClick(e, productId)} >Actualizar</button>
            </div>
          </form>
        </div>
      </div>

    </>

  );
}
