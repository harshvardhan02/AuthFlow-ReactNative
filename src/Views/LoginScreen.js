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
    Platform
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather'

import { connect } from 'react-redux';
import { loginUser } from '../Store/User/duck';

class LoginScreen extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            check_textInputChange: false,
            secureTextEntry: true
        };
    }

    textInputChange = (val) => {
        if (val.length !== 0) {
            this.setState({
                email: val,
                check_textInputChange: true
            });
        } else {
            this.setState({
                email: val,
                check_textInputChange: false
            });
        }
    }

    handlePasswordChange = (val) => {
        this.setState({
            password: val
        })
    }

    updateSecureTextEntry = () => {
        this.setState({
            secureTextEntry: !this.state.secureTextEntry
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
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Welcome</Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            value={email}
                            placeholder="Your Email"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => this.textInputChange(val)}
                        />
                        {this.state.check_textInputChange ?
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                            : null}
                    </View>
                    <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            value={password}
                            placeholder="Your Password"
                            secureTextEntry={this.state.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => this.handlePasswordChange(val)}
                        />
                        <TouchableOpacity onPress={() => this.updateSecureTextEntry()}>
                            {this.state.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.loginHandler(email, password)}
                        style={styles.loginButton}>
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 20
                            }}>
                            Sign In
            			</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.signUpButton}>
                        <Text
                            style={{
                                color: '#009387',
                                fontWeight: 'bold',
                                fontSize: 20
                            }}>
                            Sign Up
            			</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a'
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
        backgroundColor: '#009387'
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    // logo: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     marginTop: 200,
    // },
    loginButton: {
        width: '100%',
        height: 50,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#009387',
        borderRadius: 8,
    },

    signUpButton: {
        width: '100%',
        height: 50,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#009387',
        borderWidth: 1,
        borderRadius: 8,
    },
});

export default connect(
    state => ({
        initial: state.user.userToken,
    }),
    {}
)(LoginScreen)
