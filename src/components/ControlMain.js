import React from 'react';
import '../styles/ControlMain.css';

const ControlMain = ({ control }) => (
  <div className='col-5 p-0 mt-3 ml-3 control-detail-section'>
    <h1 className='mt-3 pb-3'>{control.name}</h1>
    <h2 className={`mt-3 mb-0 pb-3 ${!control.state ? 'Unknown' : control.state.isImplemented ? 'Implemented': 'Not Implemented' }`}><span className='mr-1'>STATUS</span> {!control.state ? 'Unknown' : control.state.isImplemented ? 'Implemented' : 'Not Implemented'} 

    <i className={`ml-1 fa ${!control.state ? 'fa-question Unknown' : control.state.isImplemented ? 'fa-check-square Implemented': 'fa-window-close Not Implemented' }`}></i>

    </h2>
    <p className='p-3 mb-0'>{control.text}</p>
  </div>
)

export default ControlMain;