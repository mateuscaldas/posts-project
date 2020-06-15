import React from 'react';
import { Provider } from 'react-redux';

import ListView from './components/ListView/index';
import FormView from './components/FormView/index';

import GlobalStyle from './styles/global';
import store from './store';

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <ListView />
        <FormView />

        <GlobalStyle />
      </Provider>
    </>
  );
};

export default App;
