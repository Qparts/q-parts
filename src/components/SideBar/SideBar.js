import React from "react";
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
      sidebarDocked: false,
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({ sidebarDocked: this.props.sidebarDocked});
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }


  mediaQueryChanged() {
    this.setState({ sidebarDocked: !this.props.open});
  }
  handleClick = () =>{
    this.setState({ sidebarDocked: !this.props.sidebarDocked});
  }

  render() {
    const sidebarStyles = {
  sidebar: {
    width: 300
  },
  div: {
    width: 0
  }
};
const sidebarStylesNone = {
sidebar: {
width: 0
}
};
    return (
      <div className="side-bar">
        <Sidebar
          styles={this.state.sidebarDocked ? sidebarStyles :sidebarStylesNone }
          sidebar={<b><Button text="back" className="btn-back" icon="icon-arrow-left" onClick={this.handleClick} isReverseOrder/><SettingLinks {...this.props} /></b>}
          open={this.state.sidebarDocked}
          pullRight={true}
        >
        </Sidebar>
      </div>
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
