import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {fetchWeather} from './weatherApi';
import Highlighter from 'react-native-highlight-words';

const iconNames = {
  Clear: 'md-sunny',
  Rain: 'md-rainy',
  Thunderstorm: 'md-thunderstorm',
  Clouds: 'md-cloud',
  Snow: 'md-snow',
  Drizzle: 'md-umbrella',
  Fog: 'md-water'
}

const phrases = {
  Clear: {
    title: "It's Fucking Amaze Balls",
    subtitle: "Rock that shit !",
    highlight: "Fucking"
  },
  Rain: {
    title: "Rain rain go away",
    subtitle: "Stay inside and code all day",
    highlight: "away"
  },
  Thunderstorm: {
    title: "Fucking Thunderstrike",
    subtitle: "unplug all devices",
    highlight: "Fucking"
  },
  Clouds: {
    title: "Cloud storage limit reached",
    subtitle: "error 5000",
    highlight: "limit"
  },
  Snow: {
    title: "Brain Fucking Freeze",
    subtitle: "Don't eat it !",
    highlight: "Fucking"
  },
  Drizzle: {
    title: "Meh... don't even ask",
    subtitle: "What did I just say ?",
    highlight: "don't"
  },
  Fog: {
    title: "We can't see anything",
    subtitle: "Where is my mind?",
    highlight: "anything"
  }
}

class App extends Component {

  componentWillMount() {
    this.state = {
      temp:0,
      weather:'Drizzle'
    }
  }

  componentDidMount() {
    this.getLocation()
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (posData) => fetchWeather(posData.coords.latitude, posData.coords.longitude)
        .then(res => this.setState({
          temp:Math.round(res.temp),
          weather:res.weather
        })),
      (error) => alert(error),
      {timeout: 10000}
    )
  }


  render() {
    return(
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <View style={styles.header}>
          <Icon name={iconNames[this.state.weather]} size={80} color={'white'}/>
          <Text style={styles.temp}>{this.state.temp} C</Text>
        </View>
        <View style={styles.body}>
          <Highlighter style={styles.title}
            highlightStyle={{color: 'red'}}
            searchWords={[phrases[this.state.weather].highlight]}
            textToHighlight={phrases[this.state.weather].title}
          />
          <Text style={styles.subtitle}>{phrases[this.state.weather].subtitle}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD302',
    padding: 15
  },
  header: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15
  },
  temp: {
    fontFamily: 'HelveticaNeue-Bold',
    color: 'white',
    fontSize: 32
  },
  body: {
    flex:5,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: 'HelveticaNeue-Bold',
    color: 'white',
    fontSize: 65,
    marginBottom: 10
  },
  subtitle: {
    fontFamily: 'HelveticaNeue-Bold',
    color: 'white',
    fontSize: 24
  }
})

AppRegistry.registerComponent('WeatherTest', () => App)
