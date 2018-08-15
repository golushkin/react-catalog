import MobileHeader from './MobileHeader';
import React from 'react';
import MobileContent from "./MobileContent";
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Mobile extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            mobile_info:{},
            load:false
        }
    }
    componentDidMount(){
        this.setState({load:true});
        axios.get('http://localhost:3000/mobile-info/'+this.props.match.params.id)
            .then(response=>this.setState({mobile_info:response.data,load:false}))
    }
    render(){
        if (this.state.load){
            return(
                <div className='preloader-container'>
                    <div className='preloader full-width'>
                        <div className='preloader-dotline'>
                            <div className='dot'></div>
                            <div className='dot'></div>
                            <div className='dot'></div>
                            <div className='dot'></div>
                            <div className='dot'></div>
                            <div className='dot'></div>
                            <div className='dot'></div>
                            <div className='dot'></div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            let mobile_header = {
                title: this.state.mobile_info.title,
                img: this.state.mobile_info.img,
                desc: this.state.mobile_info.description,
                price: this.state.mobile_info.price
            }
            return(
                <div className={"main"}>
                    <div className="main-mobile">
                        <MobileHeader mobile_header={mobile_header} />
                        <MobileContent ttx={this.state.mobile_info.ttx}/>
                    </div>
                </div>
            )
        }
    }
}