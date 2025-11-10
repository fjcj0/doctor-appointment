import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import type { ReactNode } from 'react';
import Loader from './tools/Loader';
import LoginPage from './pages/AuthPages/LoginPage';
import CreateAccountPage from './pages/AuthPages/CreateAccountPage';
import ForgetPassword from './pages/AuthPages/ForgetPassword';
const ProtectedRoute = ({ children }: { children: ReactNode }) => {

};
function App() {
  return (
    <div className='w-screen min-h-[100vh]'>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/create-account' element={<CreateAccountPage />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
      </Routes>
      <Toaster />
    </div>
  );
}
export default App;