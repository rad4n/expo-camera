import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

//export default function App() {
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      type: Camera.Constants.Type.back,
    }
  }

  startCamera = async () =>{
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }

  stopCamera = async () =>{
    this.setState({ hasPermission: null });
  }

  async componentDidMount() {
    this.startCamera();
  }

  render() {
    const { hasPermission } = this.state
    let button = '';
    if (hasPermission === null) {
      button = (<Button onPress={this.startCamera} title="Start Camera" />);
    } else if (hasPermission === false) {
      button = ( <Text>No access to camera</Text>);
    } else{
      button =(
        <View>
          <Camera style={{ width: '100%', height:'90%'}} type={this.state.cameraType}>
          </Camera>
          <Button style={{ width: '100%', height:'10%'}} title="Stop Camera" onPress={this.stopCamera} />
         </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent:'center'}}>
        {button}
      </View>
    );
  }
}