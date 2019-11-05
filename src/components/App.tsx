import * as React from 'react';
import "./App.scss";
import { Button } from 'antd';

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                 <Button type="primary">Primary</Button>
            </div>
        )
    }
}

