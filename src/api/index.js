import Controls from './controls.json';

const DELAY = 1500;

let getControlsPromise;

const getControls = () => {
  if (getControlsPromise) {
    // A promise to getControls() is already in-flight.  Return it rather than
    // create a new promise
    return getControlsPromise;
  }

  getControlsPromise = new Promise(res => {
    setTimeout(() => {
      getControlsPromise = null;
      return res(Controls)
    }, DELAY)
  })

  return getControlsPromise;
}

export default getControls;
