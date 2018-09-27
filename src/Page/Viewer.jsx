import React, { Component } from 'react';
import PDFViewer from '../Component/PDFViewer';

import Aaa from '../Page/aaa.pdf';
import Bbb from '../Page/bbb.pdf';
import Ccc from '../Page/ccc.pdf';

class Viewer extends Component {

    getFile = (id) => {
        console.log(id);
        let filepath;
        switch(id) {
            case 1: filepath = Aaa;break;
            case 2: filepath = Ccc;break;
            case 3: filepath = Bbb;break;
            default: filepath = Aaa;
        }
        return filepath;
    };

    render () {
        const { match } = this.props;

        return (
            <PDFViewer file="http://localhost:5000/aaa.pdf" />
        );
    }
}
export default Viewer;