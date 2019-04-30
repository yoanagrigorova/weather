import React from 'react';
import Day from '../day/index';
import './style.css';
import request from 'request';

const weatherApiKey = 'f631fd357c75163a46154773a513dd64';

class Moment extends React.Component {
    constructor(props){
        super(props);
        this.state={
            momentData:null,
            format: props.format,
            city:'София'
        }

        this.getWeather = this.getWeather.bind(this);
    }

    getWeather(city, format){
        let self = this;
        request('https://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&appid=' + weatherApiKey + '&lang=bg&cnt=3&units='+format, { json: true }, (err, response, body) => {
            if (err) { return console.log(err); }

            self.setState({
                momentData: body,
                format: format
            })

        })
    }

    componentDidMount() {
        const {city} = this.props;
        this.getWeather(city, this.state.format);
        
    }

    componentWillUpdate(){
        if(this.state.format !== this.props.format){
            this.getWeather(this.props.city, this.props.format);
        }
    }

    render() {
        const { momentData } = this.state;
        
        if (!momentData) return null;

        return (
            <div>
                <h1>moment</h1>
            </div>
        )
    }


}

export default Moment;