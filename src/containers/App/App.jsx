import React, { Component } from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';

import {style} from "variables/Variables.jsx";

import appRoutes from 'routes/app.jsx';

class App extends Component {
    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleNotificationClick = this.handleNotificationClick.bind(this);
        this.state = {
            _notificationSystem: null
        };
    }
    handleNotificationClick(position/*, level*/){
        var level = 'success';
        // switch (color) {
        //     case 1:
        //         level = 'success';
        //         break;
        //     case 2:
        //         level = 'warning';
        //         break;
        //     case 3:
        //         level = 'error';
        //         break;
        //     case 4:
        //         level = 'info';
        //         break;
        //     default:
        //         break;
        // }
        this.state._notificationSystem.addNotification({
            title: (<span data-notify="icon" className="pe-7s-gift"></span>),
            message: (
                <div>
                    this is <b>Notification</b> - testing.
                </div>
            ),
            level: level,
            position: position,
            autoDismiss: 15,
        });
    }
    componentDidMount(){
        this.setState({_notificationSystem: this.refs.notificationSystem});
        var _notificationSystem = this.refs.notificationSystem;
        var level = 'info'
        _notificationSystem.addNotification({
            title: (<span data-notify="icon" className="pe-7s-gift"></span>),
            message: (
                <div>
                    Welcome to <b>inSpectra Dashboard</b> - we are now monitoring your area.
                </div>
            ),
            level: level,
            position: "bc",
            autoDismiss: 5,
        });
    }
    componentDidUpdate(e){
        if(window.innerWidth < 993 && e.history.location.pathname !== e.location.pathname && document.documentElement.className.indexOf('nav-open') !== -1){
            document.documentElement.classList.toggle('nav-open');
        }
    }
    render() {
        return (

                <div className="wrapper">
                    <NotificationSystem ref="notificationSystem" style={style}/>
                    <Sidebar {...this.props} />
                    <div id="main-panel" className="main-panel">
                        <Header {...this.props}/>
                            <Switch>
                                {
                                    appRoutes.map((prop,key) => {
                                        if(prop.name === "Notifications")
                                            return (
                                                <Route
                                                    path={prop.path}
                                                    key={key}
                                                    render={routeProps =>
                                                       <prop.component
                                                           {...routeProps}
                                                           handleClick={this.handleNotificationClick}
                                                       />}
                                                />
                                            );
                                        if(prop.redirect)
                                            return (
                                                <Redirect from={prop.path} to={prop.to} key={key}/>
                                            );
                                        return (
                                            <Route path={prop.path} component={prop.component} key={key}/>
                                        );
                                    })
                                }
                            </Switch>
                        <Footer />
                    </div>
                </div>
        );
    }
}

export default App;
