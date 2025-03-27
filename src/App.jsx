import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import router from './routes';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <Provider store={store}>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App; 