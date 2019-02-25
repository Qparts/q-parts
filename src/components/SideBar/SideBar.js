import React, {Fragment} from "react";
import Sidebar from "react-sidebar";
import SettingLinks from '../SettingLinks/SettingLinks';
import { getTranslate } from "react-localize-redux";
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../UI/Button';
const mql = window.matchMedia(`(min-width: 800px)`);

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({ sidebarOpen: this.props.sidebarDocked});
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }


  mediaQueryChanged() {
    this.setState({ sidebarOpen: !this.props.open});
  }
  handleClick = () =>{
    this.setState({ sidebarOpen: !this.props.sidebarOpen});
  }
  onSetSidebarOpen = (close) => {
    this.setState({ sidebarOpen: close })
  }

  render() {
    const sidebarStyles = {
      sidebar: {
        width: 300
    }
    };
    return (
      <Fragment>
      <div className="side-bar-compnent-btn">
       <button className={this.state.sidebarOpen ? "none-active-btn" :"btn btn-primary" } onClick={()=> this.setState({sidebarOpen: !this.state.sidebarOpen})}>open sidebar</button>
      </div>
      <div className={this.state.sidebarOpen ? "side-bar" :"none-active" }>
        <Sidebar
          sidebarClassName="Sidebar"
          styles={ sidebarStyles }
          sidebar={<b><Button text="back" className="btn-back" icon="icon-arrow-left" onClick={()=> this.setState({sidebarOpen: !this.state.sidebarOpen})} isReverseOrder/><SettingLinks {...this.props} /></b>}
          open={this.state.sidebarOpen}
          onClick={this.handleClick}
          onSetOpen={this.onSetSidebarOpen}
          pullRight={true}
        >
        </Sidebar>
      </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    translate: getTranslate(state.localize)
  }
}
const withSide = withRouter(SideBar);
export default connect(mapStateToProps, null)(withSide);
