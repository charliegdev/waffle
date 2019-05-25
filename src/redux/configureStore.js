import { configureStore } from "redux-starter-kit";
import { reducer } from "./modules";

// By not specifying the middleware option, Redux Starter Kit enables redux-thunk automatically.
const store = configureStore({
  reducer
});

// Enable HMR
if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./modules", () => store.replaceReducer(reducer));
}

export default store;
