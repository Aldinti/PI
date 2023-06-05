import { Routes, Route} from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import FormCreateActivity from "./components/FormCreateActivity/FormCreateActivity";
import Detail from "./components/Detail/Detail";
import About from "./components/About/About";
import { Error404 } from './components/Error404/Error404';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route exact path='/' Component={LandingPage}/>
				<Route exact path='/home' Component={Home}/>
				<Route exact path='/activities' Component={FormCreateActivity}/>
				<Route exact path='/detail/:id' Component={Detail}/>
				<Route exact path='/about' Component={About}/>
				<Route path='*' Component={Error404}/>
			</Routes>
		</div>
	);
}

export default App;
