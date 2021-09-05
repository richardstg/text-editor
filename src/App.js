import React, { Component, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Toolbar from "./toolbar/Toolbar";

const App = () => {
    const [text, setText] = useState("");

    return (
        <div className="App p-5">
            <Toolbar text={text} />
            <CKEditor
                editor={ ClassicEditor }
                data="<p></p>"
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    const data = editor.getData();
                    setText(data);
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    setText(data);
                    // console.log( { event, editor, data } );
                } }
                onBlur={ ( event, editor ) => {
                    // console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    // console.log( 'Focus.', editor );
                } }
            />
        </div>
    );
}

export default App;
