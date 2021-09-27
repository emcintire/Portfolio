import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home/Home";
import Projects from "./components/Pages/Projects/Projects";
import Photography from "./components/Pages/Photography/Photography";
import Games from "./components/Pages/Games/Games";
import Landscape from "./components/Pages/Photography/Pages/Landscape/Landscape";
import Portraits from "./components/Pages/Photography/Pages/Portraits/Portraits";
import Animals from "./components/Pages/Photography/Pages/Animals/Animals";
import Miscellaneous from "./components/Pages/Photography/Pages/Miscellaneous/Miscellaneous";
import Alaska2018 from "./components/Pages/Photography/Pages/Landscape/Pages/Alaska2018/Alaska2018";
import Alaska2020 from "./components/Pages/Photography/Pages/Landscape/Pages/Alaska2020/Alaska2020";
import Malabar from "./components/Pages/Photography/Pages/Landscape/Pages/Malabar2019/Malabar";
import Mammoth from "./components/Pages/Photography/Pages/Landscape/Pages/Mammoth2020/Mammoth";
import Roadtrip from "./components/Pages/Photography/Pages/Landscape/Pages/Roadtrip2018/Roadtrip";
import Summer2017 from "./components/Pages/Photography/Pages/Landscape/Pages/Summer2017/Summer2017";
import Tetons from "./components/Pages/Photography/Pages/Landscape/Pages/Tetons2021/Tetons";
import Yellowstone from "./components/Pages/Photography/Pages/Landscape/Pages/Yellowstone2021/Yellowstone";
import Yosemite from "./components/Pages/Photography/Pages/Landscape/Pages/Yosemite2019/Yosemite";

function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/projects" exact component={Projects} />
                <Route path="/photography" exact component={Photography} />
                <Route
                    path="/photography/landscape"
                    exact
                    component={Landscape}
                />
                <Route
                    path="/photography/landscape/alaska2018"
                    exact
                    component={Alaska2018}
                />
                <Route
                    path="/photography/landscape/alaska2020"
                    exact
                    component={Alaska2020}
                />
                <Route
                    path="/photography/landscape/malabar"
                    exact
                    component={Malabar}
                />
                <Route
                    path="/photography/landscape/mammoth"
                    exact
                    component={Mammoth}
                />
                <Route
                    path="/photography/landscape/roadtrip"
                    exact
                    component={Roadtrip}
                />
                <Route
                    path="/photography/landscape/summer2017"
                    exact
                    component={Summer2017}
                />
                <Route
                    path="/photography/landscape/tetons"
                    exact
                    component={Tetons}
                />
                <Route
                    path="/photography/landscape/yellowstone"
                    exact
                    component={Yellowstone}
                />
                <Route
                    path="/photography/landscape/yosemite"
                    exact
                    component={Yosemite}
                />
                <Route
                    path="/photography/portraits"
                    exact
                    component={Portraits}
                />
                <Route path="/photography/animals" exact component={Animals} />
                <Route
                    path="/photography/miscellaneous"
                    exact
                    component={Miscellaneous}
                />
                <Route path="/games" exact component={Games} />
            </Switch>
            {/* <Footer /> */}
        </Router>
    );
}

export default App;
