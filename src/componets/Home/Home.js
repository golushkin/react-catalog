import React from 'react';
import './Home.css';
import Aside from "./Aside";
import Main from "./Main";
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mobiles: {
                mobile0:[]
            },
            load:false,
            load_next:false
        }
        this.getMobiles = this.getMobiles.bind(this);
        this.getNextMobiles = this.getNextMobiles.bind(this);
    }
    componentDidMount(){
        this.setState({load:true})
        axios.get('http://localhost:3000/home-mobiles')
            .then(response=>{
                this.setState({mobiles:{mobile0:response.data},load:false})
            })
            .catch(err=>console.log(err))
    }
    getMobiles(filtr){
        this.setState({load:true})
        axios.post('http://localhost:3000/filtr-mobiles',filtr)
            .then(response=>{
               this.setState({mobiles:{mobile0:response.data},load:false})
            })
            .catch(err=>console.log(err))
    }
    getNextMobiles(num){
        this.setState({load_next:true})
        axios.post('http://localhost:3000/next-mobile',{data:num})
            .then(response=>{
                let obj = this.state.mobiles;
                obj[`mobile${num}`]=response.data;
                this.setState({mobiles:obj,load_next:false})
            })
            .catch(err=>console.log(err))
    }
    render(){
        if (this.state.load){
            return(
                <div className='main'>
                    <Aside getMobiles={this.getMobiles} />
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
                </div>
            )
        }
        else {
            return (
                <div className='main'>
                    <Aside getMobiles={this.getMobiles} />
                    <Main mobile={this.state.mobiles}
                          load={this.state.load_next}
                          getNextMobiles={this.getNextMobiles} />
                </div>
            )
        }
    }
}

