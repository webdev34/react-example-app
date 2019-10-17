import React, { Component } from 'react';
import './App.css';
import getControls from './api';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import ControlList from './components/ControlList';
import ControlMain from './components/ControlMain';
import FilterHeader from './components/FilterHeader';

class App extends Component {
  state = {
    controls: null,
    implemented: null,
    notImplemented: null,
    unknown: null
  }
  
  componentDidMount() {
    // We have provided a simple getControls() API that will load controls.json 
    // for you.  getControls() imposes an artificial delay of 1500ms. 
    getControls().then(controls => {
      this.setState({ controls });
      this.setState({ implemented: this.state.controls.filter(value => value.status === 'Implemented') });
      this.setState({ notImplemented: this.state.controls.filter(value => value.status === 'Not Implemented') });
      this.setState({ unknown: this.state.controls.filter(value => value.status === 'Unknown') });
    });
  }

  render() {
    const { controls } = this.state;

    return (
      <Router>
        <div className="App">
          { controls &&
            <>
              <div className='direction-section mt-4 mb-2'>
                <h3 className='mb-0 ml-3'>Implementation Assessment</h3>
                <p className='mt-1 ml-3'>Evaluate the implementation status of your security controls.</p>
              </div>
              <FilterHeader controls={controls} implemented={this.state.implemented} notImplemented={this.state.notImplemented} unknown={this.state.unknown} />
              <div className='container-fluid px-0 main-container'>
                <div className='row m-0'>
                  <ControlList controls={controls} implemented={this.state.implemented} notImplemented={this.state.notImplemented} unknown={this.state.unknown} />
                  <Route exact path='/'render={() => (
                  <Redirect to={{ pathname: `/controls/${controls[0].id}` }} />
                  )} />
                  <Route path='/controls/:controlId' render={({ match }) => (
                    <ControlMain control={controls.find(c => c.id.toString() === match.params.controlId)} />
                  )} />
                </div>
              </div>
            </>
          }
        </div>
      </Router>
    );
  }
}

export default App;
