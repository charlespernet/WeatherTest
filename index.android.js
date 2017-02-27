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

const stateInfos = {
  Default: {
    icon: 'md-time',
    title: "Fetching Fucking Weather",
    subtitle: "Please wait",
    highlight: "Fucking",
    backgound: '#f48f29'
  },
  Clear: {
    icon: 'md-sunny',
    title: "It's Fucking Amaze Balls",
    subtitle: "Rock that shit !",
    highlight: "Fucking",
    backgound: '#FFD302'
  },
  Rain: {
    icon: 'md-rainy',
    title: "Rain rain go away",
    subtitle: "Stay inside and code all day",
    highlight: "away",
    backgound: '#29b6f6'
  },
  Thunderstorm: {
    icon: 'md-thunderstorm',
    title: "Fucking Thunderstrike",
    subtitle: "unplug all devices",
    highlight: "Fucking",
    backgound: '#006070'
  },
  Clouds: {
    icon: 'md-cloud',
    title: "Cloud storage limit reached",
    subtitle: "error 5000",
    highlight: "limit",
    backgound: '#d0d0d0'
  },
  Snow: {
    icon: 'md-snow',
    title: "Brain Fucking Freeze",
    subtitle: "Don't eat it !",
    highlight: "Fucking",
    backgound: '#f5f5f5'
  },
  Drizzle: {
    icon: 'md-umbrella',
    title: "Meh... don't even ask",
    subtitle: "What did I just say ?",
    highlight: "don't",
    backgound: '#52525e'
  },
  Fog: {
    icon: 'md-water',
    title: "We can't see anything",
    subtitle: "Where is my mind?",
    highlight: "anything",
    backgound: '#d0d0d0'
  }
}

class App extends Component {

  componentWillMount() {
    this.state = {
      temp:0,
      weather:'Default'
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
      <View style={[styles.container, {backgroundColor:stateInfos[this.state.weather].backgound}]}>
        <StatusBar hidden={true}/>
        <View style={styles.header}>
          <Icon name={stateInfos[this.state.weather].icon} size={80} color={'white'}/>
          <Text style={styles.temp}>{this.state.temp} C</Text>
        </View>
        <View style={styles.body}>
          <Highlighter style={styles.title}
            highlightStyle={{color: 'red'}}
            searchWords={[stateInfos[this.state.weather].highlight]}
            textToHighlight={stateInfos[this.state.weather].title}
          />
          <Text style={styles.subtitle}>{stateInfos[this.state.weather].subtitle}</Text>
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
