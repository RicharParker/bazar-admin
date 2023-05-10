import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NewProduct = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
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

  const handleClick = async (e) => {

    e.preventDefault();
    const product = { ...inputs, categories: cat };
    const success = addProduct(product, dispatch);
    if (success) {
      toast.success("Producto agregado exitosamente");
      history.push("/products");
    } else {
      toast.error("Producto no agregado");
    }


    /*
    e.preventDefault();
    if (!file) {
      console.error("File is null or undefined");
      return;
    }
  
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, categories: cat };
          addProduct(product, dispatch);
        });
      }
    );*/
  };

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

      <div className="newProduct">
        <h1 className="addProductTitle">Nuevo Producto</h1>
        <form className="addProductForm">
          <div className="addProductItem">
            <label>Imagen</label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="addProductItem">
            <label>Titulo</label>
            <input
              name="title"
              type="text"
              placeholder="Apple Airpods"
              onChange={handleChange}
              required
            />
          </div>
          <div className="addProductItem">
            <label>Descripcion</label>
            <input
              name="desc"
              type="text"
              placeholder="description..."
              onChange={handleChange}
              required
            />
          </div>
          <div className="addProductItem">
            <label>Precio</label>
            <input
              name="price"
              type="number"
              placeholder="100"
              onChange={handleChange}
              required
            />
          </div>
          <div className="addProductItem">
            <label>Categorias</label>
            <input type="text" placeholder="jeans,skirts" onChange={handleCat} required />
          </div>
          <div className="addProductItem">
            <label>Stock</label>
            <select name="inStock" onChange={handleChange}>
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
          </div>
          <button onClick={handleClick} className="addProductButton">
            Crear
          </button>
        </form>
      </div>
    </>

  );
}


export default NewProduct;