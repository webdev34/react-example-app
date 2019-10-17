import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import '../styles/ControlListDataTable.css';

class ControlListDataTable extends Component {
  constructor(props){
      super(props);
      this.state = {
        currentControl: null,
        currentFilter: null,
        lastFilter: null
      }; 
  }

  componentDidMount() {
    //Im sure theres a better way to do this in React but i went with this way to refresh the data from an event in another component. Im used to the angular way of components communicating to each other
    let filterBtns = document.getElementsByClassName('filter-btn');
    let anotherTest = this;
    for (var i=0; i < filterBtns.length; i++) {
      let thisBtn = filterBtns[i];
      filterBtns[i].onclick = function(){
          let thisFilter = thisBtn.getAttribute('filter');
          if(thisFilter === 'Unknown'){
            anotherTest.setState({currentFilter : 'Unknown'});
          }
          else if(thisFilter === 'Implemented'){
            anotherTest.setState({currentFilter : 'Implemented'});
          }
          else if(thisFilter === 'Not Implemented'){
            anotherTest.setState({currentFilter : 'Not Implemented'});
          }
          else{
            anotherTest.setState({currentFilter : 'All Controls'});
          }
      };
    }
  }

  toggleCurrentControl(currentControl) {
    this.setState({currentControl});
    this.props.history.push(`/controls/${currentControl.id}`);
  }

  render() {
    let activeId = this.props.location.pathname.split('/')[2];
    let activeControl = null;

    if (!activeId){ activeId = 0; }

    if(!this.state.currentControl){
      activeControl = this.props.data.filter(value => parseInt(value.id) === parseInt(activeId))
    }
    else{
      activeControl = this.state.currentControl;
    }
   
    if(Array.isArray(activeControl)){ activeControl = activeControl[0]; }

    let thisData = null;
    
    if(this.state.currentFilter === 'Implemented'){
      thisData = this.props.implemented ? this.props.implemented : this.props.data;
    }
    else if(this.state.currentFilter === 'Not Implemented'){
      thisData = this.props.notImplemented ? this.props.notImplemented : this.props.data;
    }
    else if(this.state.currentFilter === 'Unknown'){
      thisData = this.props.unknown ? this.props.unknown : this.props.data;
    }
    else {
      thisData = this.props.data;
    }
      return(
        <div className='data-table-container mt-0'>
          <table className='m-0'>
            <thead>
              <tr>
                <th>
                  <span className='label-text'>Control</span>
                </th>
                <th>
                  <span className='label-text'>Description</span>
                </th>
                <th>
                  <span className='label-text'>Status</span>
                </th>
              </tr>
            </thead>
            <tbody>
            {
              thisData.map((thisRow) => {
                
                thisRow.status = thisRow.state ? thisRow.state.isImplemented ? 'Implemented' : 'Not Implemented' : 'Unknown';
                
                return (
                    <tr key={thisRow.id} onClick={(e) => this.toggleCurrentControl(thisRow)} className={`${activeControl.id === thisRow.id ? 'active-table-row': '' }`}>
                        <td><span className='label-text'>{thisRow.name}</span></td>
                        <td>{thisRow.text}</td>
                        <td>
                            <span className={thisRow.status}>
                              {thisRow.status}
                              <i className={`ml-1 fa ${thisRow.status === 'Unknown' ? 'fa-question' : thisRow.status === 'Implemented' ? 'fa-check-square': 'fa-window-close' }`}></i>
                            </span>
                        </td>
                    </tr>
                  );
                }
              )
            }
          </tbody>
        </table>
      </div>
      )
  };
};

export default withRouter(ControlListDataTable);