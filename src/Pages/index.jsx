import React from 'react';

import Head from './Layout/Head';
import Content from './Layout/Content';

function Index(props) {
    return (
        <div>
            <Head/>
            <div style={{height: "84px"}}></div>
            <Content content={{title: "title", text: "text"}}/>
        </div>
    );
}

export default Index;
