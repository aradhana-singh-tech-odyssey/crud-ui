// crud-ui/src/components/AuthWrapper.jsx
import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const AuthProvider = lazy(() => import('cxoApp/AuthProvider'));

export function AuthWrapper({ children }) {
  return (
    <Suspense fallback={<Spinner animation="border" />}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Suspense>
  );
}