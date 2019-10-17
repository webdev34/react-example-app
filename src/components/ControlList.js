import React from 'react';
import ControlListDataTable from './ControlListDataTable';
import '../styles/ControlList.css';

const ControlList = ({ controls, implemented, notImplemented, unknown }) => (
  <section className='control-list-section col-7 p-0'>
    <header className='py-3'>
      <h3 className='label-text m-0 mx-4'>Controls</h3>
    </header>
    <ControlListDataTable data={controls} implemented={implemented} notImplemented={notImplemented} unknown={unknown} />
  </section>
)

export default ControlList;