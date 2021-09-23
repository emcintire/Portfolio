import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Pages/Home/Home';
import Projects from './components/Pages/Projects/Projects';
import Photography from './components/Pages/Photography/Photography';
import Games from './components/Pages/Games/Games';

function App() {
  return (
    <Router>
        <Navbar />
        <Switch>
            <Route path='/' exact component={Home} className="home-scrollbar" />
            <Route path='/projects' exact component={Projects} />
            <Route path='/photography' exact component={Photography} />
            <Route path='/games' exact component={Games} />
        </Switch>
        {/* <Footer /> */}
    </Router>   
  );
}

export default App;