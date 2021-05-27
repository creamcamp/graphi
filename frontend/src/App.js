import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import BookingsPage from './pages/Auth';
import EventsPage from './pages/Events';

import MainNavigation from './components/Navigation/MainNavigation';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <MainNavigation />
        <Switch>
          <Redirect from="/" to="/auth" exact />
          <Route path="/auth" component={ AuthPage } />
          <Route path="/events" component={ EventsPage } />
          <Route path="/bookings" component={ BookingsPage } />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
