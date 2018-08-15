import React from 'react';
import "./MobileContent.css";

export default class MobileContent extends React.Component{
    render(){
        if (this.props.ttx){
            let tr = this.props.ttx.map((value,i) => {
                if (Object.keys(value).length===1){
                    return(
                        <tr  className={"td-info"} key={i}>
                            <td colSpan={2}>
                                {value.td}
                            </td>
                        </tr>
                    )
                }
                else{
                    return(
                        <tr key={i}>
                            <td>
                                {value.td1}
                            </td>
                            <td>
                                {(value.td2.length===0?'╳':value.td2)}
                            </td>
                        </tr>
                    )
                }
            })
            return (
                <div className='mobile-content'>
                    <span>Описание</span>
                    <table>
                        <tbody>
                        {tr}
                        </tbody>
                    </table>
                </div>
            )
        }
        else {
            return(
                <h1>ожидайте</h1>
            )
        }
    }
}

