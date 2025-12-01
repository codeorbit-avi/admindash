import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import Analytics from './pages/Analytics';
import { UsersList } from './pages/UsersList';
import { UserDetails } from './pages/UserDetails';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/analytics" replace />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="users" element={<UsersList />} />
            <Route path="users/:id" element={<UserDetails />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App;