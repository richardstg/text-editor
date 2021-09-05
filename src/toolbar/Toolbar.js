import React, { Component } from 'react';

const Toolbar = (props) => {
    const saveHandler = (event) => {
        event.preventDefault();
        console.log(props.text)
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light p-4">
            <form class="form-inline my-2 my-lg-0">
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={saveHandler}>Spara</button>
            </form>
        </nav>
    );
}

export default Toolbar;
