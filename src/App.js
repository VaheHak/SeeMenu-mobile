import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ClientRestaurant from './pages/ClientRestaurant';
import ClientMenu from './pages/ClientMenu';
import NotFound from './pages/NotFound';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import ClientLogin from './pages/ClientLogin';
import ClientRegistration from './pages/ClientRegistration';
import ClientVerification from './pages/ClientVerification';
import ClientEdit from './pages/ClientEdit';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/user/verification/:key" component={ClientVerification} />
          <Route path="/restaurant/:restaurantId/myprofile" component={ClientEdit} />
          <Route path="/restaurant/:restaurantId/registration" component={ClientRegistration} />
          <Route path="/restaurant/:restaurantId/login" component={ClientLogin} />
          <Route path="/restaurant/:restaurantId/contact" component={ContactUs} />
          <Route path="/restaurant/:restaurantId/about" component={AboutUs} />
          <Route path="/restaurant/:restaurantId/menus/:menuId" component={ClientMenu} />
          <Route path="/restaurant/:restaurantId" exact component={ClientRestaurant} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
