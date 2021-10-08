import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeRoute from './HomeRoute';
import BudgetRoute from './BudgetRoute';
import ServiceRoute from './ServiceRoute';
import NotFoundRoute from './NotFoundRoute';
import CaseRoute from './CaseRoute'

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <HomeRoute />
            </Route>
            <Route exact path="/orcamento">
                <BudgetRoute />
            </Route>
            <Route exact path="/orcamento/:servicename">
                <ServiceRoute />
            </Route>
            <Route exact path="/cases">
                <CaseRoute />
            </Route>
            <Route exact path='/*' component={NotFoundRoute}/>
        </Switch>
    )
}