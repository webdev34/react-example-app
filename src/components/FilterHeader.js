import React, {Component} from 'react';
import '../styles/FilterHeader.css';
import {withRouter} from 'react-router-dom';

class FilterHeader extends Component {
    constructor(props){
        super(props);

        this.state = {
            activeFilter: 'All Controls'
        };  
    }

    handleActiveButton(currentFilter) {
       this.setState({activeFilter: currentFilter});
       return true;
    }

    percentage(num, per){
        return Math.round((num/100)*per);
    }

    render() {
        return(
            <div className='filter-header-container mt-2 py-2'>
                <label className='label-text m-0 mx-3'>Filter Controls</label>
                <ul className='btn-group m-0 ml-n5'>
                    <button type='button' className={'filter-btn btn btn-default label-text ' + (this.state.activeFilter === 'All Controls' ? 'active-filter-btn' : '')} onClick={() => this.handleActiveButton('All Controls')} filter='All Controls' >All {(this.props.controls ? this.props.controls.length : '')} Controls</button>
                    <button type='button' className={'filter-btn btn btn-default label-text ' + (this.state.activeFilter === 'Implemented' ? 'active-filter-btn' : '')} onClick={() => this.handleActiveButton('Implemented')} filter='Implemented'>
                        <i className={'fa fa-check-square Implemented'}></i>
                        {(this.props.implemented ? this.props.implemented.length : '')} Implemented {(this.props.implemented && this.props.controls ? this.percentage(this.props.controls.length, this.props.implemented.length) : '')}%
                     </button>
                    <button type='button' className={'filter-btn btn btn-default label-text ' + (this.state.activeFilter === 'Not Implemented' ? 'active-filter-btn' : '')} onClick={() => this.handleActiveButton('Not Implemented')} filter='Not Implemented'>
                        <i className={'fa fa-window-close Not Implemented'}></i>
                        {(this.props.notImplemented ? this.props.notImplemented.length : '')} Not Implemented <span className='percentage'>{(this.props.notImplemented && this.props.controls ? this.percentage(this.props.controls.length, this.props.notImplemented.length) : '')}%</span>
                    </button>
                    <button type='button' className={'filter-btn btn btn-default label-text ' + (this.state.activeFilter === 'Unknown' ? 'active-filter-btn' : '')} onClick={() => this.handleActiveButton('Unknown')} filter='Unknown'>
                        <i className={'fa fa-question Unknown'}></i>
                        {(this.props.unknown ? this.props.unknown.length : '')} Unknown <span className='percentage'>{(this.props.unknown && this.props.controls ? this.percentage(this.props.controls.length, this.props.unknown.length) : '')}%</span>
                    </button>
                </ul>
            </div>
        )
    };
};

export default withRouter(FilterHeader);