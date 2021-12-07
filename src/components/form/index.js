import React from "react";
import "./form.scss";
import { useState } from 'react';

function Form(props) {
  const [method, setMethod] = useState("get");
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [showText, setShowText] = useState(false);
  const [request, setrequest] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      method: method,
      url: url,
    };
    props.handleApiCall(formData, request);
  };

  const urlSetState = (e) => {
    setUrl(e.target.value);
  };

  const methodSetState = (e) => {
    setShowText(false);
    setMethod(e.target.id);
  };

  const textSetState = (e) => {
    setShowText(true);
    setMethod(e.target.id);
  };

  const requestSetState = (e) => {
    setrequest(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span class="url">URL: </span>
          <input name="url" type="text" onChange={urlSetState}  data-testid="input"/>
          <button type="submit"  data-testid="Go"> GO!</button>
        </label>
        <label className="methods">
          <span id="get" onClick={methodSetState} className='btn'  data-testid="get">
            GET
          </span>
          <span id="post" onClick={textSetState} className='btn'  data-testid="post">
            POST
          </span>
          <span id="put" onClick={textSetState} className='btn'  data-testid="put">
            PUT
          </span>
          <span id="delete" onClick={methodSetState} className='btn'  data-testid="delete">
            DELETE
          </span>
        </label>
      </form>
      {showText && <textarea rows="15" cols="20" onChange={requestSetState} />}
    </>
  );
}

export default Form;
