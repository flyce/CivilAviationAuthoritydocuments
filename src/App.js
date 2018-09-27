import React from 'react';

import Head from './Component/Head';
import Table from './Component/Table';
import Foot from './Component/Foot';

function Index(props) {
    return (
        <div>
            <Head/>
            <div style={{height: "84px"}}></div>
            <Table/>
            <Foot/>
        </div>
    );
}

export default Index;
