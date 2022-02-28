import React from "react";
import { Button } from "reactstrap";
function Login(props) {
  return (
    <div
      style={{
        margin: "0 auto",
        paddingTop: "50vh",
        marginLeft: "40vw",
        minWidth: "400px",
      }}
    >
      {" "}
      <Button color="success" onClick={props.onClick}>
        Login With Meta Mask
      </Button>
    </div>
  );
}

export default Login;
