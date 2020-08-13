import React from 'react';

import Route from './routes/index'
import {AuthProvider} from './contexts/auth';


function App() {
  return (
    <AuthProvider>
      <Route />
    </AuthProvider>
  );
}

export default App;
