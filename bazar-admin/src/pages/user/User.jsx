import { Link, useLocation } from "react-router-dom";
import "./user.css";
import { userData } from "../../dummyData";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { updateUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import "./user.css";

export default function User() {

  const [inputs, setInputs] = useState({});
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();


  const user = useSelector((state) =>
    state.user.users.find((user) => user._id === userId)
  );

  const toastContainerStyle = {
    fontSize: '1.5rem',
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: '10px',
    padding: '1rem',
  };

  useEffect(() => {
    setInputs({
      username: user.username,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin.toString(),
    });
  }, [user]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleUpdateClick = async (e) => {
    e.preventDefault();
    const updatedUser = { ...inputs };
    const res = await updateUser(userId, updatedUser, dispatch);
    if (res.success) {
      console.log("Imprimer esto", res.success);
      toast.success("usuario actualizado exitosamente");
      history.push("/users");
    } else {
      toast.error("No se pudo actualizar el usuario");
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

      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Editar Usuario</h1>
          <Link to="/newUser">
            <button className="userAddButton">Crear</button>
          </Link>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src="https://www.fimpes.org.mx/images/universidades/ulsaoaxaca.jpg"
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">Anna Becker</span>
                <span className="userShowUserTitle">Software Engineer</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">annabeck99</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">10.12.1999</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">+1 123 456 67</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">annabeck99@gmail.com</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">New York | USA</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder={user.username}
                    className="userUpdateInput"
                    name="username"
                    onChange={handleChange}

                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder={user.email}
                    className="userUpdateInput"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    placeholder="Pon una nueva"
                    className="userUpdateInput"
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Admnistrador</label>
                  <select className="userUpdateInput" name="isAdmin" onChange={handleChange} value={inputs.isAdmin}>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src="https://www.fimpes.org.mx/images/universidades/ulsaoaxaca.jpg"
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="userUpdateButton" onClick={handleUpdateClick}>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>

  );
}
