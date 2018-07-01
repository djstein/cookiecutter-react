import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

class PrivateRoute extends React.Component {
  render() {
    const { path, Layout, Component, exact, dispatch, user } = this.props
    if (Object.keys(user).length === 0) {
      dispatch(push('/login/'))
    } else if (user.pk) {
      return (
        <Route
          key={path}
          path={path}
          exact={exact}
          render={props => (
            <Layout {...props}>
              <Component {...props} />
            </Layout>
          )}
        />
      )
    }
    return null
  }
}

mapStateToProps = (state, ownProps) => {
  const user = state.user
  return { user }
}

PrivateRoute.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(PrivateRoute)
