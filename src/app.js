import React from 'react';

import './app.scss';
import { useState, useEffect, useReducer } from 'react';
import axios from 'axios'
import historyReducer, { addHistory, emptyHistory } from './components/reducer/reducer';
import History from './components/history/history';
import Loading from "../src/components/loading/loading";
// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';


const initialState = {
  history: []
}

function App(props) {

  const [requestParams, setRequestParams] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(historyReducer, initialState)

  const callApi = async (requestParams) => {
    // mock output
    let url = requestParams.url;
    let method = requestParams.method;
    let body = requestParams.body;
    let results = requestParams.results

    console.log('requestParams', requestParams);
    console.log('requestParams.url', requestParams.url);
    console.log('requestParams.method', requestParams.method);
    console.log('requestParams.body', requestParams.body);

    if (method == 'get' || method == 'delete') {
      await axios[method](url).then(result => {
        setData([result.data]);
        console.log('data.data', result.data);
        dispatch(addHistory(requestParams, result.data));
        setLoading(true);
      })
    } else {
      await axios[method](url, body).then(result => {
        setData([...data, result.data]);
        console.log('data.data', result.data);
        dispatch(addHistory(requestParams, result.data));
        setLoading(true);
      })
    }
    console.log('data', data);

  }




  return (
    <React.Fragment>
      <Header />
      {/* <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div> */}
      {state.history.length ? <History history={state.history} /> : null}
      <Form handleApiCall={callApi} />
      <Results data={data} />
      <Footer />
    </React.Fragment>
  );

}

export default App;