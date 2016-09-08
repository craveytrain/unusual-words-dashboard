import { combineReducers } from 'redux';
import unusuals from './unusuals';
import words from './words';

const comboReducer = combineReducers( {
  unusuals,
  words
} );

export default comboReducer;
