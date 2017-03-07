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
  TextInput,
  TouchableOpacity,
  ScrollView,
  ListView,
  View
} from 'react-native';

import Nav from './global-widgets/nav'
import SwipeCards from 'react-native-swipe-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';

import DataSource from '../data/datasource.js';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Messages extends Component {
  constructor(props){
    super(props)
    this.state = {
      dataSource: ds.cloneWithRows(DataSource.NewMatches),
      convoData: ds.cloneWithRows(DataSource.Convos),
    }
  }

  eachPic(x){
    return(
      <TouchableOpacity style={{alignItems:'center'}}>
      <Image source = {x.image} style={{width:70, height:70, borderRadius:35, margin:10}} />
      <Text style={{fontWeight:'600', color:'#444'}}>{x.first_name}</Text>
      </TouchableOpacity>
      )}

    convoRender(x){
      return(
              <TouchableOpacity style={{alignItems:'center', flexDirection:'row', marginTop:5, marginBottom:5, borderBottomWidth:1, borderColor:'#e3e3e3'}}>
              <Image source = {x.image} style={{width:70, height:70, borderRadius:35, margin:10}} />
              <View>
              <Text style={{fontWeight:'600', color:'#111'}}>{x.name}</Text>
              <Text
              numberOfLines ={1}
              style={{fontWeight:'400', color:'#888', width:200}}>{x.message}</Text>
              </View>
              </TouchableOpacity>)}


  render() {
    return (
      <View style = {{flex:1}}>
      <Nav type = 'message' onPress = {() => this.props.navigator.replace({id:'home'})} />
      <ScrollView style={styles.container}>
      <TextInput
      style = {{height:50, }}
      placeholder="Search"
      />
      <View style={styles.matches}>
      <Text style = {{color:'#da533c', fontWeight:'600', fontSize:12}}>THIS PARTY IS BUZZING WITH BAD BITCHES</Text>
      <ListView
      horizontal={true}
      showsHorizontalScrollIndicator = {false}
    dataSource={this.state.dataSource}
    pageSize = {5}
      renderRow={(rowData) =>this.eachPic(rowData)}
      />
      </View>
      <View style = {{margin:10}}>
      <Text style = {{color:'#da533c', fontWeight:'600', fontSize:12}}>MESSAGES</Text>
      <ListView
      horizontal={false}
      scrollEnabled = {false}
      showsHorizontalScrollIndicator = {false}
    dataSource={this.state.convoData}
    pageSize = {5}
      renderRow={(rowData) =>this.convoRender(rowData)}
      />
      </View>

        </ScrollView>
        </View>
    )
}
}
//onPress = {() => this.renderNope()}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10

  },
  matches:{
  borderTopWidth:1,
  paddingTop:15,
  borderTopColor:'#da533c',
  borderBottomWidth:1,
  paddingBottom:15,
  borderBottomColor:'#e3e3e3'
  },
  buttons:{
    width:80,
    height:80,
    borderWidth:10,
    borderColor:'#fff',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:40
  },
  buttonSmall:{
    width:50,
    height:50,
    borderWidth:10,
    borderColor:'#e7e7e7',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25
  },
   card: {
    flex: 1,
    alignItems: 'center',
    alignSelf:'center',
    borderWidth:2,
    borderColor:'#e3e3e3',
    width: 350,
    height: 420,
  }

});
