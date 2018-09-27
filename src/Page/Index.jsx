import React from 'react';

import Head from '../Component/Head';
import Table from '../Component/Table';
import Foot from '../Component/Foot';

const Index = () =>  {
    return (
        <div>
            <Head/>
            <div style={{height: "84px"}} />
            <Table/>
            <Foot/>
        </div>
    );
};

export default Index;
