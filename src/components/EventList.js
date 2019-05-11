import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import EventAbstract from "../components/EventAbstract";
import PropTypes from "prop-types";

export default class EventList extends Component {

  constructor(props) {
    super(props);
  }

  _renderListEvents = () => (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={this.props.events}
      keyExtractor={singleEvent => singleEvent.id.toString()}
      renderItem={({ item }) => {
        const { id, title, description } = item;
        return (
          <EventAbstract id={id} title={title} description={description} />
        );
      }}
    />
    );

  render() {
    return <>{this._renderListEvents()}</>;
  }
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
}