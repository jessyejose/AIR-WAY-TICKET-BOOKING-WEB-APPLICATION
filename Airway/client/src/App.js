import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Flight from './Flight';
import Addflight from './Addflight';
import Editflight from './Editflight';
import Class from './Class';
import Addclass from './Addclass';
import Editclass from './Editclass';
import Fare from './Fare';
import Addfare from './Addfare';
import Editfare from './Editfare';
import Dashboard from './Dashboard';
import Specpackage from './Specpackage';
import Editspecpackage from './Editspecpackage';
import Schedule from './Schedule';
import Addschedule from './Addschedule';
import Editschedule from './Editschedule';
import User from './user/User';
import Feedback from './user/Feedback';
import Editfeedback from './user/Editfeedback';
import Search from './user/Search';
import About from './user/About';
import Check from './user/Check';
import Booking from './user/Booking';
import Details from './user/Details';
import Submit from './user/Submit';



function App() {
  return (
	<BrowserRouter>
		<Routes>
		<Route path='/' element={<Dashboard/>}/>
		<Route path='/flight' element={<Flight/>}/>
		<Route path='/flightadd' element={<Addflight/>}/>
		<Route path="/flightedit" element={<Editflight/>}/>

		<Route path='/class' element={<Class/>}/>
		<Route path='/classadd' element={<Addclass/>}/>
		<Route path="/classedit" element={<Editclass/>}/>

		<Route path='/fare' element={<Fare/>}/>
		<Route path='/fareadd' element={<Addfare/>}/>
		<Route path="/fareedit" element={<Editfare/>}/>

		<Route path='/package' element={<Specpackage/>}/>
		<Route path='/packageedit' element={<Editspecpackage/>}/>

		<Route path='/schedule' element={<Schedule/>}/>
		<Route path='/scheduleadd' element={<Addschedule/>}/>
		<Route path="/scheduleedit" element={<Editschedule/>}/>

		<Route path="/user" element={<User/>}/>
		<Route path="/feedback" element={<Feedback/>}/>
		<Route path="/feedbackedit" element={<Editfeedback/>}/>
		<Route path="/search" element={<Search/>}/>
		<Route path="/about" element={<About/>}/>
		<Route path="/check" element={<Check/>}/>
		<Route path="/booking" element={<Booking/>}/>
		<Route path="/details" element={<Details/>}/>
		<Route path="/submit" element={<Submit/>}/>





		













		</Routes>
	</BrowserRouter>
	
  );
}

export default App;
