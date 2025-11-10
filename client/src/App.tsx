import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import type { ReactNode } from 'react';
import Loader from './tools/Loader';
const ProtectedRoute = ({ children }: { children: ReactNode }) => {

};
function App() {
  return (
    <>
      <Loader firSpinnerSize='w-20 h-20' secondSpinnerSize='w-14 h-14' />
      <Routes>
      </Routes>
      <Toaster />
    </>
  );
}
export default App;