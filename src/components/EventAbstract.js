import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

class EventAbstract extends Component{

    render(){
        let { id, longitude, latitude, title, description, navigation } = this.props;
        return(
            <TouchableOpacity
            onPress={() => navigation.navigate('SingleEventDetails', {id, longitude, latitude})}>
                <View>
                    <Text style={styles.text}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default withNavigation(EventAbstract);

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
    }
  });