import react, { useEffect } from "react";
import { useState } from "react";
import { init, addItem, getItems, deleteItem } from "./Web3Client";
import "./App.css";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import MiddleHR from "./MiddleHR";
import Footer from "./Footer";
import Navbar from "./Navbar";
import {
  failedTransaction,
  initiateApp,
  successfulTransaction,
  updateTransactionStatus,
  clearTx,
} from "./Utilities";
import Login from "./Login";
import { clear } from "@testing-library/user-event/dist/clear";

function App() {
  const [itemNumber, setItemNumber] = useState(0);
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [LoggedIn, setLoggedIn] = useState(false);

  function logIn() {
    initiateApp(setLoggedIn);
    getItems(setItems);
  }

  function clearTransactionButtons() {
    document.getElementById("initiate").style.transform = "scale(0)";
    document.getElementById("pending").style.transform = "scale(0)";
    document.getElementById("success").style.transform = "scale(0)";
    document.getElementById("rejected").style.transform = "scale(0)";
  }
  //  clearTransactionButtons();

  function pushItem(item = undefined) {
    let stuff = [...items];
    if (item !== undefined) {
      stuff.push(item);
      setItems(stuff);
    } else getItems(setItems);

    successfulTransaction();
  }

  return (
    <div className="main">
      {!LoggedIn ? (
        <div>
          <Navbar />
          <Login onClick={logIn} />
        </div>
      ) : (
        <div
          onLoad={setTimeout(() => {
            clearTransactionButtons();
          }, 0)}
        >
          <Navbar />
          <div className="app">
            <div className="addItem">
              <div className="title">
                <div className="title">
                  <div>Add Item</div>
                  <h6>Add Item to Blockchain</h6>
                </div>
              </div>
              <MiddleHR />

              <Form>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <br />
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Type an item name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <br />
                  <Button
                    color="success"
                    className="btn-scale"
                    onClick={async (e) => {
                      e.preventDefault();
                      if (document.getElementById("name").value == "") {
                        alert("Oops!!! \nWrite Item Name first");
                        return;
                      }
                      document.getElementById("name").value = "";
                      updateTransactionStatus("initiate");
                      await addItem(
                        name.toString(),
                        pushItem,
                        failedTransaction,
                        updateTransactionStatus
                      );
                    }}
                  >
                    ADD
                  </Button>{" "}
                </FormGroup>
              </Form>
              <div className="transact_status" id="transact_status">
                <Button id="pending" className="pending" color="warning">
                  Pending
                </Button>
                <Button id="success" className="success" color="success">
                  Success
                </Button>
                <Button id="rejected" className="rejected" color="danger">
                  Rejected !!
                </Button>
                <Button id="initiate" className="initiate" color="info">
                  Initiated
                </Button>
              </div>
            </div>
            <div className="list">
              <div className="heading">
                <div className="title">
                  <div>Items List</div>
                  <h6>Click On Item To Delete it Out</h6>
                </div>

                <MiddleHR />
              </div>
              {!items.length ? (
                <ul className="">
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <li>
                    <h1>No Items Available</h1>
                  </li>{" "}
                  <br />
                </ul>
              ) : (
                <ul>
                  {items.map((item, index) => {
                    return (
                      <li key={"item no " + index}>
                        {" "}
                        <Button
                          color="danger"
                          key={"itembutton no " + index}
                          onClick={() => {
                            updateTransactionStatus("initiate");

                            console.log("attempt to delete item ", index);

                            setTimeout(() => {
                              deleteItem(
                                index,
                                pushItem,
                                updateTransactionStatus
                              );
                            }, 1000);
                          }}
                        >
                          {" "}
                          {item}
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              )}
              <div className="title title__scroll">
                <p>Scroll Horizontal for more ( if any )</p>
                <MiddleHR />
              </div>
              <Footer onLoad={console.log("Footer Loaded")} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
