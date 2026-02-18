import React from 'react';
import NavigationRoot from './navigation';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationRoot />
    </AuthProvider>
  );
}
