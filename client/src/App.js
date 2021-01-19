import React from 'react';
import { AuthProvider } from './context/WidgetContext';
import Landing from './components/landing';
import "./css/app/app.css"

const App = () => {
  return (
    <AuthProvider>
      <Landing/>
    </AuthProvider>
   );
}
 
export default App;
