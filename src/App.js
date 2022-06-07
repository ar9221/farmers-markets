import './App.css';
import Results from './Results';

import { useState } from 'react';

function App() {

  const [searchVal, setSearchVal] = useState("");
  const [zipcode, setZipcode] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  function onSubmit(evt) {
    evt.preventDefault();
    const zipCodeRegex = /^\d{5}(?:[- ]?\d{4})?$/g;
    if (searchVal.match(zipCodeRegex) && searchVal.match(zipCodeRegex).length > 0) {
      setZipcode(parseInt(searchVal));
      setErrorMsg("");
    }
    else {
      setErrorMsg("Please enter a valid zip code.");
    }
  }

  function onChange(evt) {
    setSearchVal(evt.target.value);
    setZipcode(0);
  }
  let errorDivStyle;
  if (errorMsg) {
    errorDivStyle = "block";
  }
  else {
    errorDivStyle = "none";
  }

  return (
    <div className="App max-w-xl flex flex-col mr-auto ml-auto mb-32">
      <div><img src="img/fm-logo.png" className="ml-auto mr-auto" /></div>
      <div className="mt-16 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" style={{display: errorDivStyle}}>
        <span className="block sm:inline">{errorMsg}</span>
      </div>
      <div className="search-bar flex mt-16 justify-center">
        <input type="text" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="search-query" id="search-query" onChange={onChange} value={searchVal} placeholder="Enter zip code" />
        <button type="submit" className="bg-main-color hover:bg-secondary-color text-white font-bold py-2 ml-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={onSubmit}>Submit</button>
      </div>
      {zipcode ? <Results zipcode={zipcode} /> : <div></div>}
    </div>
  );
}

export default App;
