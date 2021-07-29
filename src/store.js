import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import { save } from 'redux-localstorage-simple';

const composeEnhancers = compose;

const configureStore = preloadedState => (
    createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(
            applyMiddleware(save({ namespace: 'todo-list' }))
        ),
    )
);

const store = configureStore({});

export default store;