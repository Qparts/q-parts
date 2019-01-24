import React, { Component } from 'react';
import Button from '../UI/Button';
import { TAB_ONE } from '../../constants';

class HelpCenter extends Component {
 constructor(props) {
  super(props);
  this.state = {
   activeIndex: TAB_ONE,
   mockHelpCenter: this.generateMockHelp(),
   activeButton: TAB_ONE,
  }
 }

 generateMockHelp = () => (
  [
   {
    tab: 'My Order', subTabs: [
     {
      text: 'Edit order', detail: {
       header: 'Edit your order', text: 'Need to make change to your order? It is simple, choose one of ......'
      }
     },
     {
      text: 'Cancel Order', detail: {
       header: 'Cancel your order', text: 'Need to make change to your order? It is simple, choose one of ......'
      }
     }
    ]
   },
   {
    tab: 'Another tab example', subTabs: [
     {
      text: 'Another Edit order', detail: {
       header: 'Another Edit your order', text: 'Another Need to make change to your order? It is simple, choose one of ......'
      }
     },
     {
      text: 'Another Cancel Order', detail: {
       header: 'Another Cancel your order', text: 'Another Need to make change to your order? It is simple, choose one of ......'
      }
     }
    ]
   }
  ]
 );

 render() {
  return (
   <div className="HelpCenter-container">
    {/* <TabView activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({ activeIndex: e.index })}>
     {
      this.state.mockHelpCenter.map((helpCenter, helpCenterIdx) => {
       return <TabPanel key={helpCenterIdx} header={helpCenter.tab}>
        <TabView activeIndex={this.state.activeButton} onTabChange={(e) => this.setState({ activeButton: e.index })}>
         {
          helpCenter.subTabs.map((subTab, subTabIdx) => {
           return <TabPanel key={subTabIdx} header={subTab.text}>
            <div>
             <h4>{subTab.detail.header}</h4>
             <p>{subTab.detail.text}</p>
             <Button text={this.props.translate("setting.helpCenter.button")} className="btn btn-secondary" />
            </div>
           </TabPanel>
          })
         }
        </TabView>
       </TabPanel>
      })
     }
    </TabView> */}
   </div>
  )
 }
}

export default HelpCenter;