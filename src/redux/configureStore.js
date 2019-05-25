import { configureStore } from 'redux-starter-kit';
import rootReducer from './modules';

// By not specifying the middleware option, Redux Starter Kit enables redux-thunk automatically.
const store = configureStore({
  reducer: rootReducer
});

// Enable HMR
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./modules', () => store.replaceReducer(rootReducer));
}

export default store;
