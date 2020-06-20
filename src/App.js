import React from 'react';
import './App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(require.context('./icons', false, /\.(png|jpe?g|svg)$/));
console.log(images);


class WeatherDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      main: "",
      imgIco: "",
      desc: "",
      temp: 0,
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.weather);
    let data = nextProps.weather;
    if (this.props !== nextProps) {
      let m = data.weather[0].main;
      let i = "";
      let d = data.weather[0].description;
      let t = data.main.temp;
      t = (t - 273.15) * 1.8 + 32

      switch (m) {
        case "Clouds":
          i = images[9];
          break;
        case "Sunny":
          i = "";
          break;
        case "Clear":
          i = images[31];
          break;
        default:
          break;
      }

      this.setState({
        main: m,
        imgIco: i,
        desc: d,
        temp: t
      });
    }
  }

  render() {
    return (
      <div>
        <svg className="weather-box">
          <image className="weather-ico" href={this.state.imgIco} />
          <text className="weather-desc">{this.state.desc}</text>
          <text className="temp">{this.state.temp.toPrecision(2)}</text>
        </svg>
      </div>
    );
  }
}

const api = "http://api.openweathermap.org/data/2.5/weather?lat=43.2185&lon=-73.5277&appid=14905d3ff64c65452620b7426fec723a";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      data: {},
      date: new Date()
    });
  }

  componentDidMount() {
    console.log("updating info...");
    fetch(api)
      .then(response => response.json())
      .then((jsonData) => {
        this.setState({data: jsonData});
      });
  }

  onDateChange = date => this.setState({date: date});

  render() {

    return (
      <div className="App">
        <h2 className="header">Good morning, Travis!</h2>
        <WeatherDisplay weather={this.state.data} />
        <br /><br />
        <button onClick={() => this.componentDidMount()}>Update Display</button>
      </div>
    );
  }
}

export default App;
