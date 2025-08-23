import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './features/auth/pages/LoginPage';
import { RegisterPage } from './features/auth/pages/RegisterPage';
import { DashboardPage } from './features/dashboard/pages/DashboardPage';
import { RecordsListPage } from './features/clinical-records/pages/RecordsListPage';
import { CreateRecordPage } from './features/clinical-records/pages/CreateRecordPage';
import { RecordDetailPage } from './features/clinical-records/pages/RecordDetailPage';
import { ProtectedRoute } from './router/ProtectedRoute';
import { ROLES } from './lib/permissions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas Protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/records" element={<RecordsListPage />} />
          <Route path="/records/:recordId" element={<RecordDetailPage />} />
        </Route>
        
        {/* Rutas solo para Personal Médico */}
        <Route element={<ProtectedRoute allowedRoles={[ROLES.MEDICAL_STAFF]} />}>
          <Route path="/records/new" element={<CreateRecordPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;