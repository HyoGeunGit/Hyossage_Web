import React from "react";
import { connect } from "react-redux";
import { url } from '../../api.json'
import './styles.css'
import axios from 'axios'
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      searchPhoneInput: ''
    }
    this.searchPhone = this.searchPhone.bind(this)
    this.xBtn = this.xBtn.bind(this)
  }
  searchPhone(text) {
    axios.post(`${url}/message/searchPhone`, {
      phone: text,
      userToken: this.props.auth.user.token
    }).then ( res => {
      this.setState({
        list: res.data
      })
    })
  }
  xBtn() {
    document.getElementById('inputPhone').value = ''
    axios.post(`${url}/message/search/${this.props.auth.user.token}/`, {
      userToken: this.props.auth.user.token
    }).then ( (res)=> {
      this.setState({
        searchPhoneInput: '', 
        list : res.data
      })
    })
  }
  async componentDidMount () {
    axios.post(`${url}/message/search/${this.props.auth.user.token}/`, {
      userToken: this.props.auth.user.token
    }).then ( (res)=> {
      this.setState({list : res.data})
    })
  }
  render() {
    return (
      <h2 className="container text-center">
        <div className="inputBox">
          <input id = 'inputPhone' className="inputPhoneNum" type = "text" placeholder="전화번호 검색 ( 예시 : 01000000000 )" onKeyDown = { (e) => {
            if(e.keyCode === 13) {
              this.searchPhone(e.target.value)
            }
          }}
            onChange = {(e) => {
              this.setState({
                searchPhoneInput: e.target.value
              })
            }}
            value = { this.searchPhoneInput}
          />
          <div className="xBtn" onClick = { () => this.xBtn()}>X</div>
          <div className="submitBtn" onClick = { () => {
            this.searchPhone(this.state.searchPhoneInput)
          }}>검색</div>
        </div>
        {
          this.state.list ? (
            <div className = "listBox">
              { this.state.list.map((contact, i) => (
                <div className="listItem" key = {i}>
                  <div className="phoneNum">{contact.phone}</div>
                  <pre className="itemData">{contact.data}</pre>
                </div>
              ))}
            </div>
          ) : null
        }
      </h2>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  null
)(Dashboard);
