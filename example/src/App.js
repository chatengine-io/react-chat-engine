import React from 'react';

import './App.css';
import RootPage from './Pages';

import thunk from "redux-thunk";
import promise from 'redux-promise';
import rootReducer from './Reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = { key: '2', storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);
export const store = createStoreWithMiddleware(persistedReducer);
const persistor = persistStore(
  store,
  {},
  () => {}
);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootPage />
      </PersistGate>
    </Provider>
  );
}

export default App;
