import React from 'react';
import './Main.css';
import {Link} from 'react-router-dom';
import Aside from "./Aside";

export default class Main extends React.Component{
    constructor(props){
        super(props);
        this.state={
            clicks:1,
            modal:false
        }
    }
    render(){
        let articles = [];
        for (let key in this.props.mobile){
            articles.push(<Articles key={key} mobile={this.props.mobile[key]} />)
        }
        return (
            <div className="main-home">
                {articles}
                <div className={'next-mobile'}
                     onClick={()=>{
                         this.props.getNextMobiles(this.state.clicks);
                         this.setState({clicks:++this.state.clicks})
                     }}>
                    {(this.props.load
                        ?
                        (<div className="preloader-btn"></div>)
                        :
                        'Следующие 30'
                    )}
                </div>
            </div>
        )
    }
}

export function Articles(props) {
    if (!props.mobile) return []
    let article = props.mobile.map((value,i) => (
        <Link key={i} to={'/mobile/'+value._id}>
            <article>
                <div className="img-title">
                    <div className="img">
                        <img title={'На главную'} src={value.img} alt=""/>
                    </div>
                    <div className="title">
                        <div className="title-name">{value.title}</div>
                        <div className="title-desc">{value.description}</div>
                    </div>
                </div>
                <div className="price">
                    {(value.price.min
                            ?
                            'от '+value.price.min + ' - ' + value.price.max + ' р.'
                            :
                            'от '+value.price.max + ' р.'
                    )}
                </div>
            </article>
        </Link>
    ))
    return article
}