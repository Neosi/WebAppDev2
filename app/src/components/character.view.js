import React from 'react';

export default class CharacterView extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={id:window.location.pathname.slice(11)}
    }

    componentDidMount(){

    }

    render(){
        return(
            <div>{this.state.id}</div>
        );
    }
}