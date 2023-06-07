import { useState } from "react";
import app from "../../firebase";
import { addUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./newUser.css";

export default function NewUser() {
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
  const handleClick = async (e) => {

    e.preventDefault();
    const User = { ...inputs, categories: cat };
   const success = addUser(User, dispatch);
    if (success) {
      toast.success("usuario agregado exitosamente");
      history.push("/Users");
    } else {
      toast.error("usuario no agregado");
    }
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

      <div className="newUser">
        <h1 className="newUserTitle">Nuevo usuario</h1>
        <form className="newUserForm">
          <div className="newUserItem">
            <label>Username</label>
            <input type="text" placeholder="john" name="username" onChange={handleChange} />
            <label>Email</label>
            <input type="email" placeholder="john@gmail.com"name="email" onChange={handleChange} />
            <label>Password</label>
            <input type="password" placeholder="password" name="password" className="selection1" onChange={handleChange} />
            <label>Administrador</label>
            <select name="isAdmin" onChange={handleChange}>
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
            <button className="newUserButton" onClick={handleClick} >Crear Usuario</button>
          </div>
        </form>
      </div>

    </>

  );
}
