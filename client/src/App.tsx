import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import type { ReactNode } from 'react';
import LoginPage from './pages/AuthPages/LoginPage';
import CreateAccountPage from './pages/AuthPages/CreateAccountPage';
import ForgetPassword from './pages/AuthPages/ForgetPassword';
import LoginDoctorOrAdminPage from './pages/AuthPages/LoginDoctorOrAdminPage';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/MainPages/HomePage';
import DoctorsPage from './pages/MainPages/DoctorsPage';
import AboutPage from './pages/MainPages/AboutPage';
import ContactPage from './pages/MainPages/ContactPage';
const ProtectedRoute = ({ children }: { children: ReactNode }) => {

};
function App() {
  return (
    <div className='w-screen min-h-[100vh]'>
      <Routes>
        {/*MAIN PAGES*/}
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/all-doctors' element={<DoctorsPage />} />
          <Route path='/contact' element={<ContactPage />} />
        </Route>
        {/**/}
        {/*AUTH PAGES*/}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/create-account' element={<CreateAccountPage />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/login-admin-or-doctor' element={<LoginDoctorOrAdminPage />} />
        {/**/}
      </Routes>
      <Toaster />
    </div>
  );
}
export default App;