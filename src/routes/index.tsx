import { Switch, Route, Redirect } from 'react-router-dom'
import { Homepage } from './../pages'
import { routeURLs } from '../constants'

export const Routes = () => {
  return (
    <Switch>
      <Route exact path={routeURLs.HOMEPAGE} component={Homepage} />
      <Redirect to={routeURLs.HOMEPAGE} />
    </Switch>
  )
}
