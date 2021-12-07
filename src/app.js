import React from 'react';
import './app.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';


import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

function App(props) {

  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});
  const [requestBody, setRequestBody] = useState({});

  useEffect(() => {
    async function requestData() {

      if (requestParams.url) {
        const response = await axios({
          method: requestParams.method,
          url: requestParams.url,
          data: requestBody,
        });
        setData(response);
      }
    }
    requestData();
  }, [requestParams]);

  function callApi(data) {
    if (data.url !== '') {
      setRequestParams(data);
      setRequestBody(data);
    }
  }



  return (
    <React.Fragment>
      <Header />
      <div  className="div1">Request Method: {requestParams.method}</div>
      <div   className="div1">URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={data} />
      <Footer />
    </React.Fragment>
  );

}

export default App;