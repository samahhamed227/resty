import React from "react";
import Loading from "../loading/loading";
import JSONPretty from 'react-json-pretty';

function Results (props) {
  
  return (
    <section>
  <pre>{props.data ? <JSONPretty data={props.data} /> : <Loading />}</pre>
    </section>
  );
}


export default Results;
