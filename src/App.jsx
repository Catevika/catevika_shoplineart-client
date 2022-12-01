import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import BasicLayout from './components/basicLayout/BasicLayout';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Cart from './pages/cart/Cart';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { AuthContext } from './context/authContext/AuthContext';
import Contact from './pages/contact/Contact';
import ErrorPage from './pages/error/Error';
import NoMatch from './pages/noMatch/NoMatch';
import './app.css';


function App() {
	const { user } = useContext(AuthContext);

	return (
		<div className='app'>
			<Routes>
				<Route path='/' element={<BasicLayout />} end>
					<Route
						path='register'
						element={user ? <Navigate to='/home' replace={true} /> : <Register />}
					/>
					<Route
						path='login'
						element={user ? <Navigate to='/home' replace={true} /> : <Login />}
					/>
					<Route path='home' element={<Home />} />
					<Route path='about' element={<About />} />
					<Route path='cart' element={user ? <Cart /> : <Login />} />
					<Route path='contact' element={<Contact />} />
					<Route path='error' element={<ErrorPage />} />
				</Route>
				<Route path='*' element={<NoMatch />} />
			</Routes>
		</div>
	);
}

export default App;
