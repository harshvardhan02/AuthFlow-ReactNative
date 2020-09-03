import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux';
import { AuthContext } from '../Components/context';

export default class SettingsScreen extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.state = {

        }

        this.handleLogout = this.handleLogout.bind(this);

    }

    handleLogout = () => {
        this.context.signOut()
    }

    render() {
        return (
            <View>
                <Text> Settings </Text>
                <Button
                    onPress={this.handleLogout}
                    title="LogOut"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        )
    }
}
