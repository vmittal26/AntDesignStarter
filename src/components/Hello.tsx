import * as React from 'react';
import "./Hello.scss";

class Hello extends React.Component<any,any>{
    constructor(props:any){
        super(props);
    }

    render(){
        return (
            <span className="Hello">Hello There</span>
        )
    }
}
export default Hello;
