import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useHistory } from "react-router-dom";
import { Grid, Paper, TextField, Button } from '@material-ui/core';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const toastContainerStyle = {
    fontSize: '1.5rem',
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: '10px',
    padding: '1rem',
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const success = await login(dispatch, { username, password });
    if (success) {
      toast.success("Login exitoso");
      history.push("/");
    }else{
      toast.error("Credenciales incorrectas");
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
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '2rem' }}>
            <Grid container spacing={3} justifyContent="center">
              <Grid item>
                <img src="https://www.fimpes.org.mx/images/universidades/ulsaoaxaca.jpg" alt="Logo" style={{ height: '5rem' }} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Matricula" variant="outlined" fullWidth
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Password" variant="outlined" fullWidth type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth onClick={handleClick}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

    </>


  );
};



export default Login;

