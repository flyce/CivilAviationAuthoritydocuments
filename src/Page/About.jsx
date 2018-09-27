import React from 'react';

import Head from '../Component/Head';
import Content from '../Component/Content';
import Foot from '../Component/Foot';

const Index = () =>  {
    const aboutUs = {
        title: "关于我们",
        content: "鸢尾工作室成立于2018年！"
    };
    return (
        <div>
            <Head/>
            <div style={{height: "84px"}} />
            <Content content={aboutUs}/>
            <Foot/>
        </div>
    );
};

export default Index;
