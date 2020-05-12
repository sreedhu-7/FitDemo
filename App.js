/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  View, Text, Button, StyleSheet
} from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit'

export default class App extends Component {

  state = {
    value: []
  }
  constructor(props) {
    super(props);
    this.state = {
      value: []
    }
  }

  componentDidMount() {
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_BODY_READ
        // Scopes.FITNESS_BLOOD_PRESSURE_READ,
        // Scopes.FITNESS_BLOOD_GLUCOSE_READ,
        // Scopes.FITNESS_BLOOD_GLUCOSE_READ,
      ],
    }

    GoogleFit.authorize(options)
      .then(authResult => {
        if (authResult.success) {
          console.log('successs')
        } else {
          console.log('failure '.authResult.message)
        }
      })
      .catch((err) => {
        console.log('Auth Failure')
        console.log(err)
      })
  }

  getHeight() {
    const opt = {
      startDate: "2020-05-05T00:00:17.971Z", // required
      endDate: new Date().toISOString(), // required
    };

    GoogleFit.getHeightSamples(opt, (err, res) => {
      console.log('get height response')
      console.log(res);
      this.setState({ value: res })
    });
  }

  getWeight() {
    const opt = {
      unit: "pound", // required; default 'kg'
      startDate: "2020-05-05T00:00:17.971Z", // required
      endDate: new Date().toISOString(), // required
      ascending: false // optional; default false
    };

    GoogleFit.getWeightSamples(opt, (err, res) => {
      console.log(res);
      this.setState({ value: res })
    });
  }

  getBloodPressure() {
    const options = {
      startDate: "2020-05-05T00:00:17.971Z", // required
      endDate: new Date().toISOString(), // required
    }
    const callback = ((error, response) => {
      console.log(error, response)
    });

    GoogleFit.getHeartRateSamples(options, callback)
    GoogleFit.getBloodPressureSamples(options, callback)
  }

  getMetabolicRate() {
    const options = {
      startDate: "2020-05-11T00:00:17.971Z", // required
      endDate: new Date().toISOString(), // required
      basalCalculation: true
    }
    const callback = ((error, response) => {
      console.log(error, response)
      this.setState({ value: response })
    });

    GoogleFit.getDailyCalorieSamples(options, callback)
  }

  getBloodGlucose() {

  }

  getBodyFatPercentage() {
    
  }

  getAllActivities() {
    let options = {
      startDate: new Date(2018, 9, 17).valueOf(), // simply outputs the number of milliseconds since the Unix Epoch
      endDate: new Date(2018, 9, 18).valueOf()
    };
    GoogleFit.getActivitySamples(options, (err, res) => {
      console.log(err, res)
    });
  }

  render() {
    return (
      <View>
        <Text>App Screen</Text>
        <Button title='Get Height' onPress={this.getHeight.bind(this)} />
        <Button title='Get Weight' onPress={this.getWeight.bind(this)} />
        <Button title='Get Blood Pressure' onPress={this.getBloodPressure.bind(this)} />
        <Button title='Get Blood Glucose' onPress={this.getBloodGlucose.bind(this)} />
        <Button title='Get Metabolic Rate' onPress={this.getMetabolicRate.bind(this)} />
        <Button title='Get Body Fat Percentage' onPress={this.getBodyFatPercentage.bind(this)} />
        <Button title='Get All Activities' onPress={this.getAllActivities.bind(this)} />

        <View>
          <Text style={
            styles.textStyle
          }>{JSON.stringify(this.state.value)}</Text></View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18
  }
})

