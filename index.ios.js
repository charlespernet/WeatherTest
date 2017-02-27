import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {fetchWeather} from './weatherApi'

class App extends Component {

  componentDidMount() {
    this.getLocation()
    fetchWeather(21, 22)
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (posData) => console.log(posData),
      (error) => alert(error),
      {timeout: 10000}
    )
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <View style={styles.header}>
          <Icon name={'ios-sunny'} size={80} color={'white'}/>
          <Text style={styles.temp}>24 C</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>Awesome <Text style={{color: 'red'}}>first app</Text> using React Native</Text>
          <Text style={styles.subtitle}>Make it cool</Text>
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
    fontSize: 24
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
