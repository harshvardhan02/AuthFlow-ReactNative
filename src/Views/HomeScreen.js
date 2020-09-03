import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import Slider from './Slider';

class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <Slider/>
        )
    }
}

export default connect(
    state => ({
        initial: state.user.initial,
    }),
    {}
)(HomeScreen)
