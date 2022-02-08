import { combineReducers } from 'redux';
import restaurantsClient from './restaurantsclient';
import menuClients from './menusclient';
import menusItem from './menusitem';
import app from './app';
import contact from './contact';
import registration from './registration';
import login from './login';
import userClient from './userclient';
import order from './order';

export default combineReducers({
  restaurantsClient,
  menuClients,
  menusItem,
  app,
  contact,
  registration,
  login,
  userClient,
  order,
});
