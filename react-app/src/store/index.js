import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import roleReducer from './roles'
import announcementReducer from './announcements';
import staffReducer from './staff';
import departmentReducer from './department';
import departmentStaffsreducer from './departmentstaff';
import patientReducer from './patient';
import contactReducer from './contact';
import reportReducer from './report';
import patientReportsReducer from './patientreport';
import staffReportsReducer from './staffreport';
import departmentReportsReducer from './departmentreport';
import roomReducer from './room';

const rootReducer = combineReducers({
  session,
  roles:roleReducer,
  staffs:staffReducer,
  patients:patientReducer,
  announcements: announcementReducer,
  departments:departmentReducer,
  departmentStaffs:departmentStaffsreducer,
  contact:contactReducer,
  reports:reportReducer,
  patientReports:patientReportsReducer,
  staffReports: staffReportsReducer,
  departmentReports: departmentReportsReducer,
  rooms: roomReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
