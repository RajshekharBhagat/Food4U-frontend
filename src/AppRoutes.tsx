
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layouts/layout';
import HomePage from './Pages/HomePage';
import AuthCallBackPage from './api/AuthCallBackPage';
import UserProfilePage from './Pages/UserProfilePage';
import ProtectedRoutes from './auth/ProtectedRoutes';
import ManageRestaurantPage from './Pages/ManageRestaurantPage';
import SearchPage from './Pages/SearchPage';
import DetailPage from './Pages/DetailPage';
import OrderPage from './Pages/OrderPage';


const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/auth-callback' element={<AuthCallBackPage />} />
        <Route path='/search/:city' element ={<Layout><SearchPage /></Layout>} />
        <Route path = '/details/:restaurantId' element={<Layout><DetailPage/></Layout>} />
        <Route element = {<ProtectedRoutes/>} >
          <Route path='/user-profile' element = {<Layout><UserProfilePage /></Layout>} />
          <Route path='/manage-restaurant-page' element ={<Layout><ManageRestaurantPage/></Layout>} />
          <Route path = '/order-status' element={<Layout><OrderPage/></Layout>} />
        </Route>
        <Route path='/' element ={ <Layout showHero><HomePage/></Layout>}/>
        <Route path='/*' element = {<Navigate to = '/'/>} />
    </Routes>
  )
}

export default AppRoutes;
