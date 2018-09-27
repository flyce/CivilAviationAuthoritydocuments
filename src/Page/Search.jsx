import React from 'react';

import Head from '../Component/Head';
import Table from '../Component/Table';
import Foot from '../Component/Foot';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    initData(keyword) {
        console.log("request", keyword);
    }

    render() {
        const { match } = this.props;
        return (
            <div>
                {this.initData(match.params.keyword)}
                <Head queryString={match.params.keyword}/>
                <div style={{height: "84px"}} />
                <Table queryString={match.params.keyword}/>
                <Foot/>
            </div>
        );
    }
}
export default Search;
