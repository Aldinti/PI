import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import FormCreateActivity from "./components/FormCreateActivity/FormCreateActivity";
import Detail from "./components/Detail/Detail";

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route exact path='/' Component={LandingPage}/>
				<Route path='/home' Component={Home}/>
				<Route path='/activities' Component={FormCreateActivity}/>
				<Route path='/countries/:id' Component={Detail}/>
			</Routes>
		</div>
	);
}

export default App;
