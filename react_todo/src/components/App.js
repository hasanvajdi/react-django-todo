import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './../static/css/App.css';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';


import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import Home from './Home'



function App() {
  return (
    <Router>

      <Switch>
        <Route path = "/login">
          <ConfigProvider direction="rtl">
            <Login />
          </ConfigProvider>
        </Route>


        <Route path = "/signup">
          <ConfigProvider direction="rtl">
            <Signup />
          </ConfigProvider>
        </Route>

        <Route path = "/profile">
            <Profile />
        </Route>

        <Route path = "/home">
            <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
