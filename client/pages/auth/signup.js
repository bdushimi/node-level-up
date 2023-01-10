import React, { useState } from "react";
import Router from 'next/router'
import useRequest from "../../hooks/useRequest";

export default function signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const {doRequest, errors} = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: () => Router.push('/')
  })

  const onSubmit = async (event) => {
    event.preventDefault();
    doRequest()
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="container">
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {errors && (
          <div className="alert alert-danger">
            <h4>Oooops....</h4>
            <ul className="my-0">{errors.map((err) => (
                <li key={err.message}>{err.message}</li>
            ))}</ul>
          </div>
        )}

        <button className="btn btn-primary">Sign Up</button>
      </div>
    </form>
  );
}
