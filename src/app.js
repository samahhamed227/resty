import React from 'react';

import './app.scss';
import { useState } from 'react';
import axios from 'axios'

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

function App(props) {

  const [state, setState] = useState({ data: null, requestParams: {} });


  const callApi = async (requestParams,body) => {
    // mock output
    
    const dataurl = await axios.get(requestParams.url);
    const data = {
      headers: [dataurl.headers], results: {data:dataurl.data},
    };
    setState({ data, requestParams });
  }


  return (
    <React.Fragment>
      <Header />
      <div  className="div1">Request Method: {state.requestParams.method}</div>
      <div className="div1"> URL: {state.requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={state.data} />
      <Footer />
    </React.Fragment>
  );

}

export default App;