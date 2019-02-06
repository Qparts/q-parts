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
  }
};
    return (
      <Fragment>
      <div className="col">
       <button className="btn btn-primary" onClick={()=> this.setState({sidebarDocked: !this.state.sidebarDocked})}>open</button>
      </div>
      <div className={this.state.sidebarDocked ? "side-bar" :"none-active" }>
        <Sidebar
          sidebarClassName="Sidebar"
          styles={ sidebarStyles }
          sidebar={<b><Button text="back" className="btn-back" icon="icon-arrow-left" onClick={()=> this.setState({sidebarDocked: !this.state.sidebarDocked})} isReverseOrder/><SettingLinks {...this.props} /></b>}
          open={this.state.sidebarDocked}
          onClick={this.handleClick}
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
