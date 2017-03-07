/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';

export default class Nav extends Component {

  home(){
    return (
      <View  style={styles.container}>
      <TouchableOpacity onPress ={this.props.toProfile}>
      <Iconz name="ios-person" color ="#888" size={25} style={styles.navbutton} />
      </TouchableOpacity>
      <Image source ={require('../../images/logo.png')} resizeMode = "contain" style={{width:100, height:30}} />
      <TouchableOpacity onPress ={this.props.chat}>
      <Iconz name="ios-chatboxes-outline" color ="#555" size={25} style={styles.navbutton} />
      </TouchableOpacity>
      </View>
    );
  }
  profile(){
    return (
      <View  style = {styles.container}>
      <View style = {styles.navbutton}/>
      <Image source ={require('../../images/logo.png')} resizeMode = "contain" style={{width:100, height:30}} />
     <TouchableOpacity onPress ={this.props.onPress}>
      <Image source = {require('../../images/tinder.png')} style = {styles.navbutton}/>
      </TouchableOpacity>
      </View>
    );
  }

  message(){
    return (
      <View  style={styles.container}>
      <TouchableOpacity onPress = {this.props.onPress}>
      <Image source = {require('../../images/tinder.png')} style = {styles.navbutton}/>
      </TouchableOpacity>
      <Image source ={require('../../images/logo.png')} resizeMode = "contain" style={{width:100, height:30}} />
      <View style = {styles.navbutton}/>
      </View>
    );
  }
  render() {
    if(this.props.type == "message"){
        return (
          <View>{this.message()}</View>
        );}
        else if (this.props.type == "profile"){
          return (
          <View>{this.profile()}</View>
        );
        }
        else{
        return (
          <View>{this.home()}</View>
        );}
  }
}

const styles = StyleSheet.create({
  container: {
    height:60,
    flexDirection:'row',
    paddingTop:10,
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor: '#fff',
    borderBottomWidth:1,
    borderColor:'rgba(0,0,0,0.1)'
  },
  navbutton: {
    width:25,
    height:25,
    margin:15
  },
});
