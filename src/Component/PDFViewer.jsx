import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';

class PDFViewer extends Component {
    state = {
        numPages: null,
        pageNumber: 1,
    };

    onDocumentLoad = ({ numPages }) => {
        this.setState({ numPages });
    };

    render() {
        // const { pageNumber, numPages } = this.state;

        return (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Document
                    file={this.props.file}
                    onLoadSuccess={this.onDocumentLoad}
                >
                    <Page pageNumber={1} />
                    <Page pageNumber={2} />
                    <Page pageNumber={3} />
                    <Page pageNumber={4} />
                </Document>
            </div>
        );
    }
}

export default PDFViewer;