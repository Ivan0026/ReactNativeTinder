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
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';
import Constants from "../Constants.js";
import DataSource from '../data/datasource.js';
import RefreshableListView from "./global-widgets/RefreshableListView.js";

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Messages extends Component {
    constructor(props){
        super(props)
        this.state = {
            personsData: null,
            lastIndex: 0
        }
    }

    renderListViewRow(x, pushNavBarTitle){
        return(
            <TouchableOpacity style={{alignItems:'center', flexDirection:'row', marginTop:3, marginBottom:3, borderBottomWidth:1, borderColor:'#e3e3e3'}}>
                <Image source = {{uri: x.picture.large}} style={{width:70, height:70, borderRadius:35, margin:5}} />
                <View>
                    <Text style={{fontWeight:'600', color:'#111'}}>{x.name.title + x.name.first}</Text>
                    <Text numberOfLines ={1} style={{fontWeight:'400', color:'#888', width:200}}>{x.email}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    listViewOnRefresh(page, callback, api_endpoint){
        var rowsData = [];
        if (page != 1 && this.state.personsData){
            this.fetchMorePersons(this.state.personsData, this.state.lastIndex, 10, callback);
        }
        else {
          fetch(api_endpoint)
          .then((response) => response.json())
          .then((persons) => {
              this.setState({personsData: persons});
              for (var i = 0; i < persons.results.length; i++) {
                  rowsData.push(persons.results[i]);
              }
              callback(rowsData);
          })
          .done();
        }
    }

    fetchMorePersons(persons, startIndex, amountToAdd, callback){
        var rowsData = [];
        fetch(DataSource.API_MESSAGES)
        .then((response) => response.json())
        .then((persons) => {
            this.setState({personsData: persons});
            for (var i = 0; i < persons.results.length; i++) {
                rowsData.push(persons.results[i]);
            }
            callback(rowsData);
        })
        .done();
    }


    render() {
        return (
            <View style={styles.container}>
                <Nav type = 'message' onPress = {() => this.props.navigator.replace({id:'home'})} />
                <RefreshableListView renderRow={(row)=>this.renderListViewRow(row, 'Ask Story')}
                                 onRefresh={(page, callback)=>this.listViewOnRefresh(page, callback, DataSource.API_MESSAGES)}
                                 backgroundColor={Constants.COLOR_BACKGROUND}
                                 style={styles.card}/>
            </View>
        )
    }

}
//onPress = {() => this.renderNope()}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    padding: 5
  }
});
