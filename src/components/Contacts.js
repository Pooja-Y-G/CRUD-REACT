import React, { useState, useEffect } from "react";
import ContactsForm from "./ContactsForm";
import firebasedb from "../firebase";

const Contacts = () => {
  const addOrEdit = (obj) => {
    if (currentId === "")
      firebasedb.child("contacts").push(obj, (err) => {
        if (err) console.log(err);
        else setcurrentId("");
      });
    else
      firebasedb.child(`contacts/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setcurrentId("");
      });
  }; //to push data into firebasedb after submiting the form

  var [contactObjects, setContactObjects] = useState({});

  var [currentId, setcurrentId] = useState("");

  useEffect(() => {
    firebasedb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() != null) setContactObjects({ ...snapshot.val() });
      else setContactObjects({});
    });
  }, []); //   to print data on rhs

  const onDelete = (key) => {
    if (window.confirm("Are you sure to delete this record?"))
      firebasedb.child(`contacts/${key}`).remove((err) => {
        if (err) console.log(err);
        else setcurrentId("");
      });
  };

  return (
    <>
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4 text-center">Contact Register</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <ContactsForm {...{ addOrEdit, currentId, contactObjects }} />
        </div>
        <div className="col-md-7">
          <table className="table table-borderless table-stripped">
            <thead className="thead-light">
              <tr>
                <th>Full Name</th>
                <th>Phone Number</th>
                <th>Email ID</th>
                <th>Company Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(contactObjects).map((id) => {
                return (
                  <tr key={id}>
                    <td>{contactObjects[id].fullname}</td>
                    <td>{contactObjects[id].phoneNo}</td>
                    <td>{contactObjects[id].mailId}</td>
                    <td>{contactObjects[id].companyName}</td>
                    <td>
                      <a
                        className="btn text-primary"
                        onClick={() => {
                          setcurrentId(id);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </a>
                      <a
                        className="btn text-danger"
                        onClick={() => {
                          onDelete(id);
                        }}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Contacts;
