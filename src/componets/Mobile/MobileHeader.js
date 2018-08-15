import React from 'react';
import './MobileHeader.css';

export default class MobileHeader extends React.Component{
    render(){
        return(
            <div className={"mobile-header"}>
                <div className="mobile-title">
                    {this.props.mobile_header.title}
                </div>
                <div className="mobile-info">
                    <div className="mobile-img">
                        <img src={this.props.mobile_header.img} alt=""/>
                    </div>
                    <div className="mobile-desc">
                        <div className="mobile-desc-info">{this.props.mobile_header.desc}</div>
                        <p>от {this.props.mobile_header.price} </p>
                    </div>
                </div>
            </div>
        )
    }
}