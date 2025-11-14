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
import UserProfilePage from './pages/MainPages/UserProfilePage';
import UserAppointmentsPage from './pages/MainPages/UserAppointmentsPage';
import AppointmentPage from './pages/MainPages/AppointmentPage';
import ListsHeaderLinks from './components/ListsHeaderLinks';
import { adminLinks, doctorLinks } from './constants/data';
import DashboardDoctorPage from './pages/DoctorsPages/DashboardDoctorPage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardAdminPage from './pages/AdminPages/DashboardAdminPage';
import DoctorAppointmentsPage from './pages/DoctorsPages/DoctorAppointmentsPage';
import ProfileDoctorPage from './pages/DoctorsPages/ProfileDoctorPage';
import AdminAppointmentsPage from './pages/AdminPages/AdminAppointmentsPage';
import AddDoctorPage from './pages/AdminPages/AddDoctorPage';
import AdminProfilePage from './pages/AdminPages/AdminProfilePage';
import DoctorsListPage from './pages/AdminPages/DoctorsListPage';
import Page404 from './components/Page404';
import RestPasswordPage from './pages/AuthPages/RestPasswordPage';
const ProtectedRoute = ({ children }: { children: ReactNode }) => {

};
function App() {
  return (
    <div className='w-screen min-h-[100vh]'>
      <ListsHeaderLinks />
      <Routes>
        {/*MAIN PAGES*/}
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/all-doctors' element={<DoctorsPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/my-profile' element={<UserProfilePage />} />
          <Route path='/my-appointments' element={<UserAppointmentsPage />} />
          <Route path='/appointment/:id' element={<AppointmentPage />} />
        </Route>
        {/**/}
        {/*AUTH PAGES*/}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/create-account' element={<CreateAccountPage />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/login-admin-or-doctor' element={<LoginDoctorOrAdminPage />} />
        <Route path='/reset-password/:code' element={<RestPasswordPage />} />
        {/**/}
        {/*DOCTOR PAGES*/}
        <Route path='/dashboard-doctor' element={<DashboardLayout typeHeader='doctor' links={doctorLinks} />}>
          <Route index element={<DashboardDoctorPage />} />
          <Route path='/dashboard-doctor/appointments' element={<DoctorAppointmentsPage />} />
          <Route path='/dashboard-doctor/profile' element={<ProfileDoctorPage />} />
        </Route >
        {/**/}
        <Route path='/dashboard-admin' element={<DashboardLayout typeHeader='admin' links={adminLinks} />}>
          <Route index element={<DashboardAdminPage />} />
          <Route path='/dashboard-admin/appointments' element={<AdminAppointmentsPage />} />
          <Route path='/dashboard-admin/add-doctor' element={<AddDoctorPage />} />
          <Route path='/dashboard-admin/doctors-list' element={<DoctorsListPage />} />
          <Route path='/dashboard-admin/profile' element={<AdminProfilePage />} />
        </Route >
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Toaster />
    </div>
  );
}
export default App;