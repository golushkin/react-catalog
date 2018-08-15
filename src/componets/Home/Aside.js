import React from 'react';
import './Aside.css';

export default class Aside extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            filtr: {
                'filtr.company':{$in:[]},
                'filtr.price':{},
                'filtr.year':{},
                'filtr.os':{$in:[]},
                'filtr.screen_size':{},
                'filtr.screen_resolution':{},
                'filtr.sootnosheniye_storon':{},
                'filtr.platform':{$in:[]},
                'filtr.screen_technology':{$in:[]},
                'filtr.ram':{},
                'filtr.flash_memory':{},
                'filtr.camera':{},
                'filtr.number_sim':{$in:[]},
                'filtr.format_sim':{$in:[]},
                'filtr.colors':{$in:[]},
                'filtr.capacity':{$in:[]},
            }
        }

        this.getInput = this.getInput.bind(this);
        this.getCheckBox = this.getCheckBox.bind(this);
        this.getSelect = this.getSelect.bind(this);
    }

    getCheckBox(name_check,name_title,existence){
        let obj = this.state.filtr;
        if (existence){
            obj['filtr.'+name_title].$in.push(name_check);
        }
        else {
            let index = obj['filtr.'+name_title].$in.indexOf(name_check)
            obj['filtr.'+name_title].$in.splice(index,1);
        }
        this.setState({filtr: obj});
        this.props.getMobiles(this.state.filtr);
    }

    getInput(value,name_title, name_class){
        let obj = this.state.filtr;
        if (name_title !== 'price' && value!==""){
            if (name_class==="min"){
                obj['filtr.'+name_title]={$gt:parseFloat(value),$lt:obj['filtr.'+name_title].$lt};
            }
            else {
                obj['filtr.'+name_title]={$gt:obj['filtr.'+name_title].$gt,$lt:parseFloat(value)};
            }
        }
        else if (value!=="") {
            if (name_class==="min"){
                obj['filtr.'+name_title+'.min']={$gt: parseFloat(value)};
            }
            else {
                obj['filtr.'+name_title+'.max']= {$lt: parseFloat(value)};
            }
        }
        else {
            if (name_class==="min" && name_title!=='price'){
                obj['filtr.'+name_title]={};
            }
            else if (name_title!=='price') {
                obj['filtr.'+name_title]= {};
            }
            else {
                if (name_class==="min"){
                    obj['filtr.'+name_title+'.min']={};
                }
                else {
                    obj['filtr.'+name_title+'.max']= {};
                }
            }
        }
        this.setState({filtr:obj});
        this.props.getMobiles(this.state.filtr);
    }

    getSelect(screen_size_name,name_title,screen_size_val){
        let obj = this.state.filtr;
        let number;
        if ((name_title==='ram' || name_title==='flash_memory') && screen_size_val !== ''){
            switch (screen_size_val.split(' ')[1]){
                case 'Кб':
                    number = parseFloat(screen_size_val.split(' ')[0]) -0.1/2048;
                    if (screen_size_name === 'min'){
                        obj['filtr.'+name_title]={$gt: number};
                    }
                    else {
                        obj['filtr.'+name_title]={$lt:number};
                    }
                    break;
                case 'Мб':
                    number = parseFloat(screen_size_val.split(' ')[0]) -0.1/1024;
                    if (screen_size_name === 'min'){
                        obj['filtr.'+name_title]={$gt: number};
                    }
                    else {
                        obj['filtr.'+name_title]={$lt:number};
                    }
                    break;
                case 'ГБ':
                    number = parseFloat(screen_size_val.split(' ')[0]) -0.1;
                    if (screen_size_name === 'min'){
                        obj['filtr.'+name_title]={$gt: number};
                    }
                    else {
                        obj['filtr.'+name_title]={$lt:number};
                    }
                    break;
            }
        }
        else if (name_title==='screen_resolution'  && screen_size_val !== ''){
            let number = parseFloat(screen_size_val.split('x')[0]) + parseFloat(screen_size_val.split('x')[1]);
            if (screen_size_name === 'min'){
                obj['filtr.'+name_title]={$gt:number-0.1};
            }
            else {
                obj['filtr.'+name_title]={$lt: number+0.1};
            }
        }
        else if (name_title==='sootnosheniye_storon'  && screen_size_val !== ''){
            let number = parseFloat(screen_size_val.split(':')[0]) + parseFloat(screen_size_val.split(':')[1]) -0.1;
            if (screen_size_name === 'min'){
                obj['filtr.'+name_title]={$gt:number};
            }
            else {
                obj['filtr.'+name_title]={$lt: number};
            }
        }
        else if (screen_size_val !== '') {
            if (screen_size_name === 'min'){
                obj['filtr.'+name_title]={$gt: parseFloat(screen_size_val)-0.01};
            }
            else {
                obj['filtr.'+name_title]={$lt:parseFloat(screen_size_val)+0.01};
            }
        }
        else {
            if (screen_size_name === 'min'){
                obj['filtr.'+name_title]={};
            }
            else {
                obj['filtr.'+name_title]={};
            }
        }
        this.setState({filtr: obj});
        this.props.getMobiles(this.state.filtr);
    }

    render(){
        return (
            <aside className={(this.props.modal?'active':'')}>
                <Company getCheckBox={this.getCheckBox} />
                <AsideMinPrice getInput={this.getInput} />
                <DateOfDev getInput={this.getInput} />
                <Os getCheckBox={this.getCheckBox} />
                <ScreenSize getSelect={this.getSelect} />
                <ScreenResolution getSelect={this.getSelect} />
                <SootnosheniyeStoron getSelect={this.getSelect} />
                <ScreenTechnology getCheckBox={this.getCheckBox} />
                <Platform getCheckBox={this.getCheckBox} />
                <RAM getSelect={this.getSelect} />
                <FlashMemory getSelect={this.getSelect} />
                <Camera getInput={this.getInput} />
                <NumberSim getCheckBox={this.getCheckBox} />
                <FormatSim getCheckBox={this.getCheckBox} />
                <Color getCheckBox={this.getCheckBox} />
                <BatteryCapacity getInput={this.getInput} />
            </aside>
        )
    }
}

class Company extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            click: false
        }
    }
    render(){
        let proiz_s = ["Apple","ASUS","Google","Huawei","Lenovo","Xiaomi"];
        let proiz = ["4Good","Acer","AGM","Alcatel","Apple","Archos","Ark","ASUS","Atomic","bb-mobile","BenQ","BlackBerry",
            "Blackview","Bluboo","BQ","BQ-Mobile","Bravis","Caterpillar","Cubot","DEXP","Digma","Doogee","Doopro","Elari",
            "Elephone","Essential","Explay","Fly","Flycat","General Mobile","Gigabyte","Ginzzu","Goclever","Google","Gretel",
            "Haier","Highscreen","Homtom","Honor","HP","HTC","Huawei","Hugerock","iMan","iNew","iocean","IQM","IRBIS","iRU",
            "Iuni","Jiayu","Jinga","Keecoo","Keneksi","Kodak","Krez","Leagoo","LeEco","Lenovo","Lexand","LG","Mann","MaxCom",
            "Maxvi","Maze","MEIZU","Micromax","Microsoft","Motorola","MyPhone","Nokia","Nomu","Nubia","Oinom","Omlook","OnePlus",
            "ONEXT","Oppo","Oukitel","Oysters","Panasonic","Philips","Prestigio","QUMO","Razer","Ritmix","RitzViva","RoverPhone",
            "RugGear","Rugtel","Runbo","Samsung","Senseit","Sharp","Smarty","SNAMI","Snopow","Sony","Stark","TeXet","ThL",
            "Tonino Lamborghini","TP-Link","Turbopad","Uhans","Ulefone","UMi","Venso","Vernee","Vertex","Vivo","Vkworld",
            "Wileyfox", "Xiaomi","Yota","Zoji","Zopo","ZTE","ZUK"];
        return(
            <div className="aside aside-company">
                <p>Производитель</p>
                <ul className="company-info">
                    {proiz_s.map((val,i)=>(
                        <li key={i}>
                            <label>
                                <input
                                    ref={(node)=>this[val] = node}
                                    onChange={(e)=>{
                                        this.props.getCheckBox(e.target.getAttribute('company'),"company", e.target.checked);
                                    }}
                                    id={val}
                                    company={val}
                                    type="checkbox"/>
                                {val}
                            </label>
                        </li>
                    ))}
                </ul>
                <div
                    onClick={()=>this.setState({click: !this.state.click})}
                    className="aside-company-all btn-aside">
                    Все производители
                </div>
                <div className={(this.state.click?'aside-company-all-block active':'aside-company-all-block')}>
                    <ul className="company-info-all">
                        {proiz.map((val,i)=>(
                            <li key={i}>
                                <label>
                                    <input
                                        onChange={(e)=>{
                                            this.props.getCheckBox(e.target.getAttribute('company'),"company", e.target.checked);
                                            if (this[val]){
                                                this[val].checked = !this[val].checked;
                                            }
                                        }}
                                        company={val}
                                        type="checkbox"/>
                                    {val}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
};

function AsideMinPrice(props){
    return(
        <div className="aside aside-price">
            Минимальная цена
            <div className="min-max price">
                <input name={'min-price'}
                       onBlur={(e)=>props.getInput(e.target.value,'price','min')}
                       placeholder={'от'}
                       type="text"/>
                <input name={'max-price'}
                       onBlur={(e)=>props.getInput(e.target.value,'price','max')}
                       placeholder={'до'}
                       type="text"/>
            </div>
        </div>
    )
};

class DateOfDev extends React.Component{
    constructor(props){
        super(props);
        this.state={
            clicks:0,
            min:100000,
            max:0,
            checkbox:{}
        }
    }
    render(){
        let date = new Date();
        let year = date.getFullYear();
        let years = [];
        for (let i = year;i>year-4;i--){
            years.push((
                <li key={i}>
                    <input id={'date'+i}
                           name={'min-date'}
                           onClick={(e)=>{
                               if (e.target.checked){
                                   switch (e.target['id']){
                                       case 'date2018':
                                           this.state.min>2018 ? this.state.min = 2018: this.state.min = this.state.min
                                           break;
                                       case 'date2017':
                                           this.state.min>2017 ? this.state.min = 2017: this.state.min = this.state.min
                                           break;
                                       case 'date2016':
                                           this.state.min>2016 ? this.state.min = 2016: this.state.min = this.state.min
                                           break;
                                       case 'date2015':
                                           this.state.min>2015 ? this.state.min = 2015: this.state.min = this.state.min
                                           break;
                                   }
                                   this._min_date.value = this.state.min;
                                   this.props.getInput(this.state.min-0.1,'year','min')
                               }
                               else {
                                   let i = 0;
                                   let number = Object.keys(this.state.checkbox);
                                   number = number.length;
                                   for (let key in this.state.checkbox){
                                       if (this.state.checkbox[key].checked){
                                           this._min_date.value = this.state.checkbox[key].value;
                                           this.props.getInput(this._min_date.value-0.1,'year','min');
                                           break;
                                       }
                                       ++i;
                                   }
                                    if (i===number){
                                        this._min_date.value = '';
                                        this.props.getInput('','year','min');
                                    }
                               }
                           }}
                           value={i}
                           ref={(node)=>this.state.checkbox[i]=node}
                           type="checkbox"/>
                    <label htmlFor={'date'+i}>{i}</label>
                </li>
            ))
        }
        return(
            <div className="aside aside-date">
                Дата выхода на рынок
                <ul className="date-info">
                    {years}
                </ul>
                <div className="min-max date">
                    <input name={'min date'}
                           ref={(node)=> this._min_date=node}
                           onBlur={(e)=>{
                               if (e.target.value) this.props.getInput(e.target.value-0.1,'year','min');
                               else this.props.getInput(e.target.value,'year','min')
                           }}
                           placeholder={'2004'}
                           type="text"/>
                    <input name={'max-date'}
                           ref={(node)=> this._max_date=node}
                           onBlur={(e)=>{
                               if (e.target.value) this.props.getInput(e.target.value+0.1,'year','max');
                               else this.props.getInput(e.target.value,'year','max')
                           }}
                           placeholder={year}
                           type="text"/>
                </div>
            </div>
        )
    }
};

function Os(props){
    let os = ['Android','Apple iOS','Windows Phone',
        'Symbian','Windows Mobile','BlackBerry OS','Nokia Series 30+'];
    return(
        <div className="aside aside-os">
            Операционная система
            <ul className="os-info">
                {os.map((val,i)=>(
                    <li key={i}>
                        <input id={'os'+i}
                               name={val}
                               onChange={(e)=>props.getCheckBox(e.target['name'],"os",e.target.checked)}
                               type="checkbox"/>
                        <label htmlFor={'os'+i}>{val}</label>
                    </li>
                ))}
            </ul>
        </div>
    )
};

function ScreenSize(props){
    const screen_size = ["",1,1.1,1.4,1.44,1.5,1.55,1.7,1.77,1.8,1.9,
        2,2.2,2.3,2.4,2.44,2.45,2.55,2.6,2.8,3,3.14,3.2,3.27,3.31,
        3.5,3.65,3.7,3.8,4,4.2,4.3,4.5,4.55,4.6,4.65,4.7,4.8,5,5.1,
        5.15,5.2,5.25,5.3,5.4,5.45,5.5,5.6,5.65,5.7,5.8,5.84,5.85,
        5.9,5.95,5.99,6,6.1,6.2,6.3,6.4,6.5,6.6,6.8,6.9,7];
    return(
        <div className="aside aside-screen-size">
            Размер экрана
            <div className="screen-size-info">
                <select onChange={(e)=>props.getSelect('min','screen_size',e.target.value)}
                        name="screen-size-min" id="">
                    {screen_size.map((val,i)=>(
                        <option key={i} value={val}>{val}</option>
                    ))}
                </select>
                <select onChange={(e)=>props.getSelect('max','screen_size',e.target.value)}
                        name="screen-size-max"
                        id="">
                    {screen_size.map((val,i)=>(
                        <option key={i} value={val}>{val}</option>
                    ))}
                </select>
            </div>
        </div>
    )
};

class ScreenResolution extends React.Component{
    constructor(props){
        super(props);
        this.state={
            checkbox:{},
            min:{
                num:10000,
                title:''
            }
        }
    }
    onCheck(i){
        switch (i){
            case 0:
                this.state.min.num>1500 ? this.state.min = {num:1500,title:'540x960 (qHD)'}: this.state.min = this.state.min
                break;
            case 1:
                this.state.min.num>2000 ? this.state.min = {num:2000,title:'720x1280 (HD)'}: this.state.min = this.state.min
                break;
            case 2:
                this.state.min.num>3000 ? this.state.min = {num:3000,title:'1080x1920 (FullHD)'}: this.state.min = this.state.min
                break;
            case 3:
                this.state.min.num>4000 ? this.state.min = {num:4000,title:'1440x2560 (QHD)'}: this.state.min = this.state.min
                break;
        }
        this._min.value = this.state.min.title.split(' ')[0];
        this.props.getSelect('min','screen_resolution',this._min.value)
    }
    offCheck(){
        let i = 0;
        let number = Object.keys(this.state.checkbox);
        number = number.length;
        for (let key in this.state.checkbox){
            if (this.state.checkbox[key].checked){
                this._min.value = this.state.checkbox[key].value.split(' ')[0];
                this.props.getSelect('min','screen_resolution',this._min.value)
                break;
            }
            ++i;
        }
        if (i===number){
            this._min.value = '';
            this.state.min={num:10000,title:''};
            this.props.getSelect('min','screen_resolution',this._min.value)
        }
    }
    render(){
        let screen_resolution = ["","96x64", "96x68", "128x64", "128x128", "120x160", "128x160", "160x128", "176x144", "144x176",
            "176x208", "174x220", "176x220", "220x176", "200x176", "240x240", "240x320", "320x240", "320x400", "272x480", "272x500",
            "275x540", "360x400", "320x480", "360x640", "480x800", "800x480", "480x854", "480x864", "480x960", "540x960", "640x960",
            "600x1024", "640x1136", "640x1280", "720x720", "720x1280", "720x1440", "720x1480", "720x1512", "720x1520", "750x1334", "768x1280",
            "1080x1620", "1080x1920", "1080x2040", "1080x2160", "1080x2220", "1080x2240", "1080x2244", "1080x2246", "1080x2248", "1080x2280",
            "1080x2316", "1080x2340", "1125x2436", "1312x2560", "1440x1440", "1440x2560", "1440x2880", "1440x2960", "1440x3120", "1536x2560",
            "1600x2560", "2160x3840"];
        let screen_resolution_s = ["540x960 (qHD)","720x1280 (HD)","1080x1920 (FullHD)","1440x2560 (QHD)"];
        return(
            <div className="aside aside-screen-resolution">
                Разрешение экрана
                <ul className="screen-resolution-s-info">
                    {screen_resolution_s.map((val,i)=>(
                        <li key={i}>
                            <label>
                                <input value={val}
                                       ref={(node)=>this.state.checkbox['check'+i]=node}
                                       onClick={(e)=>{
                                            if (e.target.checked){
                                                this.onCheck(i)
                                            }
                                            else{
                                                this.offCheck()
                                            }
                                       }}
                                       type="checkbox"/>
                                {val}
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="screen-resolution-info">
                    <select name="screen-resolution-min"
                            ref={(node)=>this._min=node}
                            onChange={(e)=>{
                                this.props.getSelect('min','screen_resolution',e.target.value)
                            }}>
                        {screen_resolution.map((val,i)=>(
                            <option key={i}
                                    value={val}>
                                {val}
                            </option>
                        ))}
                    </select>
                    <select name="screen-resolution-max"
                            ref={(node)=>this._max=node}
                            onChange={(e)=>{
                                this.props.getSelect('max','screen_resolution',e.target.value)
                            }}
                    >
                        {screen_resolution.map((val,i)=>(
                            <option key={i} value={val}>{val}</option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }
};

class SootnosheniyeStoron extends React.Component{
    constructor(props){
        super(props);
        this.state={
            min:{
                num:1000,
                title:'',
            },
            checkbox:{}
        }
    }
    onCheck(i){
        switch (i){
            case 0:
                this.state.min.num>16 ? this.state.min = {num:16,title:'16:9'}: this.state.min = this.state.min
                break;
            case 1:
                this.state.min.num>18 ? this.state.min = {num:18,title:'18:9'}: this.state.min = this.state.min
                break;
        }
        this._min.value = this.state.min.title;
        this.props.getSelect('min','sootnosheniye_storon',this._min.value)
    }
    offCheck(){
        let i = 0;
        let number = Object.keys(this.state.checkbox);
        number = number.length;
        for (let key in this.state.checkbox){
            if (this.state.checkbox[key].checked){
                this._min.value = this.state.checkbox[key].value;
                this.props.getSelect('min','sootnosheniye_storon',this._min.value)
                break;
            }
            ++i;
        }
        if (i===number){
            this._min.value = '';
            this.state.min={num:10000,title:''};
            this.props.getSelect('min','sootnosheniye_storon',this._min.value)
        }
    }
    render(){
        let sootnosheniye_storon = ["", "1:1", "3:2", "4:3", "16:9", "17:9", "18:9", "18.5:9", "18.7:9", "19:9", "19:10", "19.5:9"];
        return(
            <div className="aside aside-sootnosheniye-storon">
                Соотношение сторон
                <ul className="sootnosheniye-storon-s-info">
                    <li>
                        <label>
                            <input value={'16:9'}
                                   ref={(node)=>this.state.checkbox.check0 = node}
                                   onClick={(e)=>{
                                       e.target.checked?this.onCheck(0):this.offCheck()
                                   }} type="checkbox"/>
                            cтандартное 16:9
                        </label>
                    </li>
                    <li>
                        <label>
                            <input value={'18:9'}
                                   ref={(node)=>this.state.checkbox.check1 = node}
                                   onClick={(e)=>{
                                       e.target.checked?this.onCheck(1):this.offCheck()
                                   }} type="checkbox"/>
                            вытянутое 18:9
                        </label>
                    </li>
                </ul>
                <div className="sootnosheniye-storon-info">
                    <select name="sootnosheniye-storon-min"
                            onChange={(e)=>{
                                this.props.getSelect('min','sootnosheniye_storon',e.target.value)
                            }}
                            ref={(node)=>this._min=node}>
                        {sootnosheniye_storon.map((val,i)=>(
                            <option key={i} value={val}>{val}</option>
                        ))}
                    </select>
                    <select name="sootnosheniye-storon-max"
                            onChange={(e)=>{
                                this.props.getSelect('max','sootnosheniye_storon',e.target.value)
                            }}
                            ref={(node)=>this._max=node}>
                        {sootnosheniye_storon.map((val,i)=>(
                            <option key={i} value={val}>{val}</option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }
};

function ScreenTechnology(props){
    let screen_technology_s = ["TFT","IPS", "AMOLED", "OLED", "PVA (SLCD)"];
    return(
        <div className="aside aside-screen-technology">
            Технология экрана
            <ul className="screen_technology-s-info">
                {screen_technology_s.map((val,i)=>(
                    <li key={i}>
                        <label>
                            <input name={val}
                                   onClick={(e)=>props.getCheckBox(e.target['name'],"screen_technology", e.target.checked)}
                                   type="checkbox"/>
                            {val}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    )
};

class Platform extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            click: false
        }
    }
    render(){
        let platform = ["Apple A", "Broadcom", "Samsung Exynos", "Huawei HiSilicon", "Intel Atom", "Marvell",
            "Mediatek", "Qualcomm Snapdragon", "Spreadtrum", "Xiaomi Surge", "TI OMAP"];
        let platform_s = ["Apple A", "Broadcom", "Samsung Exynos", "Huawei HiSilicon", "Intel Atom"];
        return(
            <div className="aside aside-platform">
                Платформа
                <ul className="platform-s-info">
                    {platform_s.map((val,i)=>(
                        <li key={i}>
                            <input id={'platform'+i}
                                   ref={(node)=>this[val]=node}
                                   name={val}
                                   onClick={(e)=>this.props.getCheckBox(val,"platform", e.target.checked)}
                                   type="checkbox"/>
                            <label htmlFor={'platform'+i}>{val}</label>
                        </li>
                    ))}
                </ul>
                <div
                    onClick={()=>this.setState({click: !this.state.click})}
                    className="platform btn-aside">
                    Все 11 вариантов
                </div>
                <div className={(this.state.click?'platform-block active':'platform-block')}>
                    <ul className="platform-info-all">
                        {platform.map((val,i)=>(
                            <li key={i}>
                                <label>
                                    <input type="checkbox"
                                           onChange={(e)=>{
                                               this.props.getCheckBox(val,"platform", e.target.checked)
                                               if (this[val]){
                                                   this[val].checked = !this[val].checked
                                               }
                                           }}
                                           />
                                    {val}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
};

class RAM extends React.Component{
    constructor(props){
        super(props);
        this.state={
            min:{
                num:10000,
                title:''
            },
            checkbox:{}
        }
    }
    onCheck(i){
        switch (i){
            case 0:
                this.state.min.num>1.5 ? this.state.min = {num:1.5,title:'1.5 ГБ'}: this.state.min = this.state.min
                break;
            case 1:
                this.state.min.num>2 ? this.state.min = {num:2,title:'2 ГБ'}: this.state.min = this.state.min
                break;
            case 2:
                this.state.min.num>3 ? this.state.min = {num:3,title:'3 ГБ'}: this.state.min = this.state.min
                break;
            case 3:
                this.state.min.num>4 ? this.state.min = {num:4,title:'4 ГБ'}: this.state.min = this.state.min
                break;
            case 4:
                this.state.min.num>6 ? this.state.min = {num:6,title:'6 ГБ'}: this.state.min = this.state.min
                break;
        }
        this._min.value = this.state.min.title;
        this.props.getSelect('min','ram',this._min.value)
    }
    offCheck(){
        let i = 0;
        let number = Object.keys(this.state.checkbox);
        number = number.length;
        for (let key in this.state.checkbox){
            if (this.state.checkbox[key].checked){
                this._min.value = this.state.checkbox[key].value;
                this.props.getSelect('min','ram',this._min.value)
                break;
            }
            ++i;
        }
        if (i===number){
            this._min.value = '';
            this.state.min={num:10000,title:''};
            this.props.getSelect('min','ram',this._min.value)
        }
    }
    render(){
        let ram = ["", "384 Кб", "4 Мб", "8 Мб", "16 Мб", "24 Мб", "32 Мб", "64 Мб", "128 Мб", "192 Мб", "256 Мб",
            "278 Мб", "280 Мб", "290 Мб", "384 Мб", "512 Мб", "576 Мб", "768 Мб", "1 ГБ", "1.5 ГБ", "2 ГБ", "3 ГБ",
            "4 ГБ", "6 ГБ", "8 ГБ"];
        let ram_s = ["1.5 ГБ","2 ГБ","3 ГБ","4 ГБ","6 ГБ"];
        return(
            <div className="aside aside-ram">
                Оперативная память
                <ul className="ram-s-info">
                    {ram_s.map((val,i)=>(
                        <li key={i}>
                            <label>
                                <input ref={(node)=>this.state.checkbox['check'+i]=node}
                                       value={val}
                                       onClick={(e)=>e.target.checked?this.onCheck(i):this.offCheck()}
                                       type="checkbox"/>
                                {val}
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="ram-info">
                    <select name="ram-min"
                            onChange={(e)=>{
                                this.props.getSelect('min','ram',e.target.value)
                            }}
                            ref={(node)=>this._min = node}>
                        {ram.map((val,i)=>(
                            <option key={i} value={val}>{val}</option>
                        ))}
                    </select>
                    <select name="ram-max"
                            onChange={(e)=>{
                                this.props.getSelect('max','ram',e.target.value)
                            }}
                            id="">
                        {ram.map((val,i)=>(
                            <option key={i} value={val}>{val}</option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }
};

class FlashMemory extends React.Component{
    constructor(props){
        super(props);
        this.state={
            min:{
                num:10000,
                title:''
            },
            checkbox:{}
        }
    }
    onCheck(i){
        switch (i){
            case 0:
                this.state.min.num>1.5 ? this.state.min = {num:1.5,title:'1.5 ГБ'}: this.state.min = this.state.min
                break;
            case 1:
                this.state.min.num>2 ? this.state.min = {num:2,title:'2 ГБ'}: this.state.min = this.state.min
                break;
            case 2:
                this.state.min.num>3 ? this.state.min = {num:3,title:'3 ГБ'}: this.state.min = this.state.min
                break;
            case 3:
                this.state.min.num>4 ? this.state.min = {num:4,title:'4 ГБ'}: this.state.min = this.state.min
                break;
            case 4:
                this.state.min.num>6 ? this.state.min = {num:6,title:'6 ГБ'}: this.state.min = this.state.min
                break;
        }
        this._min.value = this.state.min.title;
        this.props.getSelect('min','flash_memory',this._min.value)
    }
    offCheck(){
        let i = 0;
        let number = Object.keys(this.state.checkbox);
        number = number.length;
        for (let key in this.state.checkbox){
            if (this.state.checkbox[key].checked){
                this._min.value = this.state.checkbox[key].value;
                this.props.getSelect('min','flash_memory',this._min.value)
                break;
            }
            ++i;
        }
        if (i===number){
            this._min.value = '';
            this.state.min={num:10000,title:''};
            this.props.getSelect('min','flash_memory',this._min.value)
        }
    }
    render(){
        let flash_memory = ["", "8 Кб", "145 Кб", "200 Кб", "690 Кб", "2.5 Мб", "4 Мб", "6 Мб", "7.8 Мб", "8 Мб", "10 Мб",
            "16 Мб", "20 Мб", "24 Мб", "28 Мб", "30 Мб", "31.9 Мб", "32 Мб", "40 Мб", "45 Мб", "50 Мб", "60 Мб", "64 Мб",
            "70 Мб", "90 Мб", "128 Мб", "158 Мб", "160 Мб", "190 Мб", "200 Мб", "256 Мб", "512 Мб", "1 ГБ", "1.1 Гб",
            "2 ГБ", "3 ГБ", "4 ГБ", "8 ГБ", "16 ГБ", "32 ГБ", "64 ГБ", "128 ГБ", "256 ГБ", "512 ГБ"];
        let flash_memory_s = ["1.5 ГБ","2 ГБ","3 ГБ","4 ГБ","6 ГБ"];
        return(
            <div className="aside aside-flash-memory">
                Флеш память
                <ul className="flash-memory-s-info">
                    {flash_memory_s.map((val,i)=>(
                        <li key={i}>
                            <label>
                                <input value={val} onClick={(e)=>e.target.checked?this.onCheck(i):this.offCheck()} type="checkbox"/>
                                {val}
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="flash-memory-info">
                    <select name="flash-memory-min"
                            onChange={(e)=>{
                                this.props.getSelect('min','flash_memory',e.target.value)
                            }}
                            ref={(node)=>this._min = node}>
                        {flash_memory.map((val,i)=>(
                            <option key={i} value={val}>{val}</option>
                        ))}
                    </select>
                    <select name="flash-memory-max"
                            onChange={(e)=>{
                                this.props.getSelect('max','flash_memory',e.target.value)
                            }}
                            id="">
                        {flash_memory.map((val,i)=>(
                            <option key={i} value={val}>{val}</option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }
};

class Camera extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            min:10000,
            checkbox:{}
        }
    }
    onCheck(i){
        switch (i){
            case 0:
                this.state.min>3 ? this.state.min = 3: this.state.min = this.state.min
                break;
            case 1:
                this.state.min>5 ? this.state.min = 5: this.state.min = this.state.min
                break;
            case 2:
                this.state.min>10 ? this.state.min = 10: this.state.min = this.state.min
                break;
            case 3:
                this.state.min>14 ? this.state.min = 14: this.state.min = this.state.min
                break;
            case 4:
                this.state.min>16 ? this.state.min = 16: this.state.min = this.state.min
                break;
            case 5:
                this.state.min>20 ? this.state.min = 20: this.state.min = this.state.min
                break;
        }
        this._min.value = this.state.min;
        this.props.getInput(parseFloat(this._min.value)-0.01,'camera','min')
    }
    offCheck(){
        let i = 0;
        let number = Object.keys(this.state.checkbox);
        number = number.length;
        for (let key in this.state.checkbox){
            if (this.state.checkbox[key].checked){
                this._min.value = this.state.checkbox[key].value;
                this.props.getInput(parseFloat(this._min.value)-0.01,'camera','min')
                break;
            }
            ++i;
        }
        if (i===number){
            this._min.value = '';
            this.state.min=10000;
            this.props.getInput('','camera','min')
        }
    }
    render(){
        let camera = ["3 Мп","5 Мп","10 Мп","14 Мп","16 Мп","20 Мп"];
        return(
            <div className="aside aside-camera">
                Камера, Мп
                <ul className="camera-info">
                    {camera.map((val,i)=>(
                        <li key={i}>
                            <label>
                                <input type="checkbox"
                                       value={val}
                                       ref={(node)=>this.state.checkbox['check'+i]=node}
                                       onClick={(e)=>e.target.checked?this.onCheck(i):this.offCheck()}
                                />
                                {val}
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="min-max camera">
                    <input placeholder={'от 0,08'}
                           ref={(node)=>this._min = node}
                           onBlur={(e)=>this.props.getInput(e.target.value-0.01,'camera','min')}
                           type="text"/>
                    <input placeholder={'до 41'}
                           onBlur={(e)=>this.props.getInput(e.target.value+0.01,'camera','max')}
                           type="text"/>
                </div>
            </div>
        )
    }
};

function NumberSim(props){
    let number_sim = [1,2,3,4]
    return(
        <div className="aside aside-numbersim">
            Количество SIM-карт
            {number_sim.map((val,i)=>(
                <div key={i} className="sim">
                    <input id={'sim'+i}
                           name={val}
                           onChange={e=>props.getCheckBox(e.target['name'],"number_sim",e.target.checked)}
                           type="checkbox"/>
                    <label htmlFor={"sim"+i}>{val}</label>
                </div>
            ))}
        </div>
    )
};

function FormatSim(props){
    let format_sim = ['обычная','micro-SIM','nano-SIM','LTE'];
    return(
        <div className="aside aside-formatsim">
            Формат SIM-карты
            {format_sim.map(((value, index) => (
                <div key={index} className="f-sim">
                    <input id={'f-sim'+index}
                           name={value}
                           onChange={(e)=>props.getCheckBox(e.target['name'],"format_sim",e.target.checked)}
                           type="checkbox"/>
                    <label htmlFor={'f-sim'+index}>{value}</label>
                </div>
            )))}
        </div>
    )
};

class Color extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            click: false
        }
    }
    render(){
        let colors = ["бежевый", "белый", "бордовый", "бронзовый", "голубой", "желтый", "зеленый", "золотистый",
            "коричневый", "красный", "медный", "оранжевый", "розовый", "серебристый", "серый", "синий", "сиреневый",
            "темно-коричневый", "темно-красный", "темно-серый", "темно-синий", "фиолетовый", "бирюзовый", "черный"];
        let colors_s = ["бежевый", "белый", "бордовый", "бронзовый"];
        return(
            <div className="aside aside-color">
                Цвет корпуса
                {colors_s.map((val,i)=>(
                    <div key={i} className="color-info">
                        <label>
                            <input ref={(node)=>this[val]=node}
                                   name={val}
                                   onChange={(e)=>this.props.getCheckBox(e.target['name'],"colors",e.target.checked)}
                                   type="checkbox"/>
                            {val}
                        </label>
                    </div>
                ))}
                <div
                    onClick={()=>this.setState({click: !this.state.click})}
                    className="color btn-aside">
                    Все 24 варианта
                </div>
                <div className={(this.state.click?'color-block active':'color-block')}>
                    <ul className="color-info-all">
                        {colors.map((val,i)=>(
                            <li key={i}>
                                <label>
                                    <input
                                        onChange={(e)=>{
                                            this.props.getCheckBox(e.target['name'],"colors",e.target.checked)
                                            if (this[val]){
                                                this[val].checked = !this[val].checked;
                                            }
                                        }}
                                        type="checkbox"/>
                                    {val}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
};

class BatteryCapacity extends React.Component{
    constructor(props){
        super(props);
        this.state={
            min:10000,
            checkbox:{}
        }
    }
    onCheck(i){
        switch (i){
            case 0:
                this.state.min>1500 ? this.state.min = 1500: this.state.min = this.state.min
                break;
            case 1:
                this.state.min>2000 ? this.state.min = 2000: this.state.min = this.state.min
                break;
            case 2:
                this.state.min>2500 ? this.state.min = 2500: this.state.min = this.state.min
                break;
            case 3:
                this.state.min>2700 ? this.state.min = 2700: this.state.min = this.state.min
                break;
            case 4:
                this.state.min>3100 ? this.state.min = 3100: this.state.min = this.state.min
                break;
            case 5:
                this.state.min>3400 ? this.state.min = 3400: this.state.min = this.state.min
                break;
            case 6:
                this.state.min>3500 ? this.state.min = 3500: this.state.min = this.state.min
                break;
        }
        this._min.value = this.state.min;
        this.props.getInput(parseFloat(this._min.value)-0.01,'capacity','min')
    }
    offCheck(){
        let i = 0;
        let number = Object.keys(this.state.checkbox);
        number = number.length;
        for (let key in this.state.checkbox){
            if (this.state.checkbox[key].checked){
                this._min.value = this.state.checkbox[key].value.split(' ')[0];
                this.props.getInput(parseFloat(this._min.value)-0.01,'capacity','min')
                break;
            }
            ++i;
        }
        if (i===number){
            this._min.value = '';
            this.state.min=10000;
            this.props.getInput('','capacity','min')
        }
    }
    render(){
        let capacity = ["1500 мАч", "2000 мАч", "2500 мАч", "2700 мАч", "3100 мАч", "3400 мАч", "3500 мАч"];
        return(
            <div className="aside aside-batterycapacity">
                Емкость аккумулятора, мАч
                {capacity.map((val,i)=>(
                    <div key={i} className="capacity-info">
                        <label>
                            <input onClick={(e)=>e.target.checked?this.onCheck(i):this.offCheck()}
                                   value={val}
                                   type="checkbox"/>
                            {val}
                        </label>
                    </div>
                ))}
                <div className="min-max capacity">
                    <input placeholder={'220'}
                           ref={(node)=>this._min=node}
                           onBlur={(e)=>this.props.getInput(e.target.value,'capacity','min')}
                           type="text"/>
                    <input placeholder={'12000'}
                           onBlur={(e)=>this.props.getInput(e.target.value,'capacity','max')}
                           type="text"/>
                </div>
            </div>
        )
    }
};