import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Pages/Home/Home';
import About from './components/Pages/About/About';
import Projects from './components/Pages/Projects/Projects';
import Pictures from './components/Pages/Pictures/Pictures';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/about' exact component={About} />
        <Route path='/projects' exact component={Projects} />
        <Route path='/pictures' exact component={Pictures} />
        <Route path='/games' exact component={About} />
      </Switch>
      {/* <Footer /> */}
    </Router>   
  );
}

export default App;