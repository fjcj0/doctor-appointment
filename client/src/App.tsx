import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect, type ReactNode } from 'react';
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
import useUserStore from './store/UserStore';
import Loader from './tools/Loader';
import useDoctorStore from './store/DoctorStore';
import useAdminStore from './store/AdminStore';
const ProtectedUserRoute = ({ children }: { children: ReactNode }) => {
  const { isVerified, isCheckingVerify } = useUserStore();
  if (isCheckingVerify) {
    return (
      <Loader
        content_loader_style='w-full h-[100vh] flex items-center justify-center'
        firSpinnerSize='w-20 h-20'
        secondSpinnerSize='w-14 h-14'
      />
    );
  }
  if (!isVerified) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
const RedirectAuthenticatedUser = ({ children }: { children: ReactNode }) => {
  const { isVerified, isCheckingVerify } = useUserStore();
  if (isCheckingVerify) {
    return (
      <Loader
        content_loader_style='w-full h-[100vh] flex items-center justify-center'
        firSpinnerSize='w-20 h-20'
        secondSpinnerSize='w-14 h-14'
      />
    );
  }
  if (isVerified) {
    return <Navigate to="/dashboard-doctor" replace />;
  }
  return <>{children}</>;
};
const ProtectedDoctorRoute = ({ children }: { children: ReactNode }) => {
  const { isDoctorVerified, isCheckingDoctorVerify } = useDoctorStore();
  if (isCheckingDoctorVerify) {
    return (
      <Loader
        content_loader_style='w-full h-[100vh] flex items-center justify-center'
        firSpinnerSize='w-20 h-20'
        secondSpinnerSize='w-14 h-14'
      />
    );
  }
  if (!isDoctorVerified) {
    return <Navigate to="/login-admin-or-doctor" replace />;
  }
  return <>{children}</>;
};
const ProtectedAdminRoute = ({ children }: { children: ReactNode }) => {
  const { isAdminVerified, isCheckingAdminVerify } = useAdminStore();
  if (isCheckingAdminVerify) {
    return (
      <Loader
        content_loader_style='w-full h-[100vh] flex items-center justify-center'
        firSpinnerSize='w-20 h-20'
        secondSpinnerSize='w-14 h-14'
      />
    );
  }
  if (!isAdminVerified) {
    return <Navigate to="/login-admin-or-doctor" replace />;
  }
  return <>{children}</>;
};
const RedirectAuthenticatedAdminOrAuthnticatedDoctor = ({ children }: { children: ReactNode }) => {
  const { isAdminVerified, isCheckingAdminVerify } = useAdminStore();
  const { isDoctorVerified, isCheckingDoctorVerify } = useDoctorStore();
  if (isCheckingAdminVerify || isCheckingDoctorVerify) {
    return (
      <Loader
        content_loader_style='w-full h-[100vh] flex items-center justify-center'
        firSpinnerSize='w-20 h-20'
        secondSpinnerSize='w-14 h-14'
      />
    );
  }
  if (isAdminVerified) {
    return <Navigate to="/dashboard-admin" replace />;
  }
  if (isDoctorVerified) {
    return <Navigate to="/dashboard-doctor" replace />;
  }
  return <>{children}</>;
};
function App() {
  const { checkAdminAuth, isCheckingAdminVerify } = useAdminStore();
  useEffect(() => {
    checkAdminAuth();
  }, [checkAdminAuth]);
  const { checkDoctorAuth, isCheckingDoctorVerify } = useDoctorStore();
  useEffect(() => {
    checkDoctorAuth();
  }, [checkDoctorAuth]);
  const { checkAuth, isCheckingVerify } = useUserStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingVerify || isCheckingDoctorVerify || isCheckingAdminVerify) {
    return (
      <Loader
        content_loader_style='w-full h-[100vh] flex items-center justify-center'
        firSpinnerSize='w-20 h-20'
        secondSpinnerSize='w-14 h-14'
      />
    );
  }
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
          <Route path='/my-profile' element={
            <ProtectedUserRoute>
              <UserProfilePage />
            </ProtectedUserRoute>
          } />
          <Route path='/my-appointments' element={
            <ProtectedUserRoute>
              <UserAppointmentsPage />
            </ProtectedUserRoute>
          } />
          <Route path='/appointment/:id' element={
            <ProtectedUserRoute>
              <AppointmentPage />
            </ProtectedUserRoute>
          } />
        </Route>
        {/*AUTH PAGES*/}
        <Route path='/login' element={
          <RedirectAuthenticatedUser>
            <LoginPage />
          </RedirectAuthenticatedUser>
        } />
        <Route path='/create-account' element={
          <RedirectAuthenticatedUser>
            <CreateAccountPage />
          </RedirectAuthenticatedUser>
        } />
        <Route path='/forget-password' element={
          <ForgetPassword />
        } />
        <Route path='/login-admin-or-doctor' element={
          <RedirectAuthenticatedAdminOrAuthnticatedDoctor>
            <LoginDoctorOrAdminPage />
          </RedirectAuthenticatedAdminOrAuthnticatedDoctor>
        } />
        <Route path='/reset-password/:code' element={<RestPasswordPage />} />
        <Route path='/dashboard-doctor' element={<DashboardLayout typeHeader='doctor' links={doctorLinks} />}>
          <Route index element={
            <ProtectedDoctorRoute>
              <DashboardDoctorPage />
            </ProtectedDoctorRoute>} />
          <Route path='/dashboard-doctor/appointments' element={
            <ProtectedDoctorRoute>
              <DoctorAppointmentsPage />
            </ProtectedDoctorRoute>
          } />
          <Route path='/dashboard-doctor/profile' element={
            <ProtectedDoctorRoute>
              <ProfileDoctorPage /></ProtectedDoctorRoute>
          } />
        </Route>
        <Route path='/dashboard-admin' element={
          <DashboardLayout typeHeader='admin' links={adminLinks} />
        }>
          <Route index element={<ProtectedAdminRoute>
            <DashboardAdminPage />
          </ProtectedAdminRoute>} />
          <Route path='/dashboard-admin/appointments' element={<ProtectedAdminRoute>
            <AdminAppointmentsPage />
          </ProtectedAdminRoute>} />
          <Route path='/dashboard-admin/add-doctor' element={<ProtectedAdminRoute>
            <AddDoctorPage />
          </ProtectedAdminRoute>} />
          <Route path='/dashboard-admin/doctors-list' element={<ProtectedAdminRoute>
            <DoctorsListPage />
          </ProtectedAdminRoute>} />
          <Route path='/dashboard-admin/profile' element={<ProtectedAdminRoute>
            <AdminProfilePage />
          </ProtectedAdminRoute>} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Toaster />
    </div>
  );
}
export default App;