import {
	createBrowserRouter,
	Route,
	Router,
	RouterProvider,
	Routes,
} from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { Home } from './page/Home/Home'
import { CarsList } from './page/CarsList/CarsList'
import { Car } from './page/Car/Car'
import { CarAdd } from './page/CarAdd/CarAdd.tsx'
import { Login } from './page/Login/Login'
import { Register } from './page/Register/Register'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { Auth } from './page/Auth/Auth.tsx'
import { MyAds } from './page/MyAds/MyAds.tsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout></Layout>,
		children: [
			{
				path: '/',
				element: <Home></Home>,
			},
			{
				path: '/cars',
				element: <CarsList></CarsList>,
			},
			{
				path: '/car/:id',
				element: <Car></Car>,
			},
			{
				path: '/car/ad',
				element: <CarAdd></CarAdd>,
			},
			{ path: '/my', element: <MyAds></MyAds> },
		],
	},
	{
		path: '/login',
		element: <Login></Login>,
	},
	{ path: '/register', element: <Register></Register> },
])

function App() {
	return <RouterProvider router={router}></RouterProvider>
}

export default App
