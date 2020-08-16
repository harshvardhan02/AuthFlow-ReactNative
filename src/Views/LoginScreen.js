import React, { Component } from 'react';
import { AuthContext } from '../Components/context';

import {
    Text,
    StyleSheet,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { loginUser } from '../Store/User/duck';

class LoginScreen extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    onChangeHandler = (state, value) => {
        this.setState({
            [state]: value
        })
    }

    loginHandler = () => {
        const { email, password } = this.state;
        const data = { email, password }
        this.context.signIn(data)
    }

    render() {
        const { email, password } = this.state;
        return (
            <ScrollView style={{ backgroundColor: '#f06543' }}>
                <View style={styles.logo}>
                    {/* <Image style={{ height: 25, width: 210, }} source={require('../../assets/logo.png')} /> */}
                </View>
                <View
                    style={{
                        marginHorizontal: 30,
                        backgroundColor: '#7084E5',
                        borderRadius: 8,
                        marginTop: 30,
                    }}>
                    <TextInput
                        onChangeText={(value) => this.onChangeHandler('email', value)}
                        value={email}
                        maxLength={40}
                        placeholder="Email"
                        autoCapitalize='none'
                        placeholderTextColor="#ffffffaa"
                        style={{
                            paddingHorizontal: 15,
                            color: '#fff',
                            fontFamily: 'Muli-Medium',
                        }}
                    />
                    <View
                        style={{
                            borderColor: '#5E79DB',
                            borderWidth: 0.5,
                            marginLeft: 10,
                        }}></View>
                    <TextInput
                        onChangeText={(value) => this.onChangeHandler('password', value)}
                        value={password}
                        secureTextEntry={true}
                        maxLength={40}
                        placeholder="Password"
                        placeholderTextColor="#ffffffaa"
                        style={{
                            paddingHorizontal: 15,
                            color: '#fff',
                            fontFamily: 'Muli-Medium',
                        }}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => this.loginHandler(email, password)}
                    style={styles.loginButton}>
                    <Text
                        style={{
                            color: '#6872E3',
                            textAlign: 'center',
                            fontFamily: 'Muli-Medium',
                        }}>
                        Sign In
            			</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200,
    },
    loginButton: {
        marginHorizontal: 30,
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 10,
    },
});

export default connect(
    state => ({
        initial: state.user.userToken,
    }),
    {}
)(LoginScreen)
