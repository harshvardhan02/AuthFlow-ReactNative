import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { logOut } from '../Store/User/duck';
import { AuthContext } from '../Components/context';

class HomeScreen extends Component {

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
                <Text> Home </Text>
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

export default connect(
    state => ({
        initial: state.user.initial,
    }),
    {}
)(HomeScreen)
