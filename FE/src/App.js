import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Switch, Route } from "react-router-dom";
import "react-datetime/css/react-datetime.css";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import Dashboard from './compoments/Dashboard2/index'
import Index from './compoments/User/index';
import Login from './compoments/User/Login_register/Login';
import TourDetail1 from './compoments/User/Tour/TourDetail';
import MenuProfile from './compoments/User/Profile/MenuProfile';
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Switch >
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/index" component={Index}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/prolife" component={MenuProfile}></Route>
          <Route path="/tourdetail/:id" component={TourDetail1}></Route>
        </Switch>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </LocalizationProvider>
  );
}

export default App;
