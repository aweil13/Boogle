import React from 'react';
import { AuthRoute } from '../util/route_util';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import BoardContainer from './board/board_container';
import Modal from './modal/modal';
import NewGameModal from './newGameModal/newGameModal';

const App = () => {
    return (
    <div>
        <Modal/>
        <NewGameModal />
        <NavBarContainer />
        <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/board" component={BoardContainer}/>
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
            <Redirect to="/board" />
        </Switch>
    </div>
)};

export default App;