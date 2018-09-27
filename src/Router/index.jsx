import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import history from './history.js';

import Index from '../Page/Index';
import About from '../Page/About';

class RouterIndex extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Index}/>
                    <Route path="/about" component={About}/>
                    <Route component={NoMatch}/>
                </Switch>
            </Router>
        );
    }
}

const NoMatch = ({location}) => (
    <div>
        <h3>未找到路由: <code>{location.pathname}</code></h3>
        <Link to="/">回主页</Link>
    </div>
);


export default RouterIndex;