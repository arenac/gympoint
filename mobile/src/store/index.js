import createSagaMiddleware from 'redux-saga';

import createStore from './createStore';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

export default createStore(rootReducer, middlewares);

sagaMiddleware.run(rootSaga);
