import React from 'react';
import { AuthProvider } from './context/WidgetContext';
import Landing from './components/landing';

const App = () => {
  return (
    <AuthProvider>
      <Landing/>
    </AuthProvider>
   );
}
 
export default App;
