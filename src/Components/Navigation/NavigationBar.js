import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { logout } from "../../Application/Actions/authAction";
import PropTypes from "prop-types";

class NavigationBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const userName = this.props.auth.user.userId;
    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li>
         
          <Link to="#" className='pull-right' onClick={this.logout.bind(this)}>
            로그아웃
          </Link>
          <span className='welcome'>Welcome <b>{userName}</b></span>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
      <li>
        <Link to="/dashboard">대쉬보드</Link>
      </li>
        <li>
          <Link to="/login">로그인</Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/dashboard" className="navbar-brand">
            Hyossage
            </Link>
          </div>

          <div className="collapse navbar-collapse">
            {isAuthenticated ? userLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  { logout }
)(NavigationBar);
