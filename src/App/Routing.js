import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../Components/context';
import { fetch } from '../Utils'

import {
    View,
    ActivityIndicator
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../Views/HomeScreen';
import NotificationScreen from '../Views/NotificationScreen';
import SearchScreen from '../Views/SearchScreen';
import SettingsScreen from '../Views/SettingsScreen';
import LoginScreen from '../Views/LoginScreen';

const navOptionHandler = () => ({
    headerShown: false,
});

const StackHome = createStackNavigator();
function HomeStack() {
    return (
        <StackHome.Navigator>
            <StackHome.Screen
                name="Home"
                component={HomeScreen}
                options={navOptionHandler}
            />
        </StackHome.Navigator>
    )
}

const StackNotification = createStackNavigator();
function NotificationStack() {
    return (
        <StackNotification.Navigator>
            <StackNotification.Screen
                name="Notification"
                component={NotificationScreen}
                options={navOptionHandler}
            />
        </StackNotification.Navigator>
    )
}

const StackSearch = createStackNavigator();
function SearchStack() {
    return (
        <StackSearch.Navigator>
            <StackSearch.Screen
                name="Search"
                component={SearchScreen}
                options={navOptionHandler}
            />
        </StackSearch.Navigator>
    )
}

const StackSetting = createStackNavigator();
function SettingStack() {
    return (
        <StackSetting.Navigator>
            <StackSetting.Screen
                name="Setting"
                component={SettingsScreen}
                options={navOptionHandler}
            />
        </StackSetting.Navigator>
    )
}

const Tab = createBottomTabNavigator();
function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'cog' : 'cog-outline';
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'magnify' : 'magnify';
                    } else if (route.name === 'Notification') {
                        iconName = focused ? 'bell' : 'bell-outline';
                    }
                    return (
                        <MaterialCommunityIcons name={iconName} size={size} color={color} />
                    );
                },
            })}>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Notification" component={NotificationStack} />
            <Tab.Screen name="Search" component={SearchStack} />
            <Tab.Screen name="Settings" component={SettingStack} />
        </Tab.Navigator>
    );
}

const StackRouting = createStackNavigator();
const Routing = (props) => {

    const initialLoginState = {
        isLoading: true,
        userName: null,
        userToken: null
    };

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false
                };
        }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext = React.useMemo(() => ({
        signIn: async (data) => {
            let userToken;
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            };
            try {
                const fetchResponse = await fetch(`https://reqres.in/api/login`, settings);
                const data = await fetchResponse.json();
                console.log(data)
                userToken = data.token
                await AsyncStorage.setItem('userToken', userToken)
            } catch (e) {
                console.warn(e)
                if (e.error !== null) {
                    userToken = null
                }
            }
            dispatch({ type: 'LOGIN', token: userToken })
        },

        signOut: async () => {
            try {
                await AsyncStorage.removeItem('userToken')
            } catch (e) {
                console.warn(e);
            }
            dispatch({ type: 'LOGOUT' })
        },

        signUp: () => { }
    }), []);

    useEffect(() => {
        const getToken = async () => {
            let userToken;
            try {
                userToken = await AsyncStorage.getItem('userToken')
            } catch (e) {
                console.warn(e);
            }
            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
        }

        getToken();
    }, []);

    if (loginState.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        )
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <StackRouting.Navigator initialRouteName="Login">
                    {loginState.userToken !== null ? (
                        <>
                            <StackRouting.Screen
                                name="HomeApp"
                                component={TabNavigator}
                                options={navOptionHandler}
                            />
                        </>
                    ) : (
                            <>
                                <StackRouting.Screen
                                    name="Login"
                                    component={LoginScreen}
                                    options={navOptionHandler}
                                />
                            </>
                        )}
                </StackRouting.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
};

export default connect(
    state => ({
        token: state.user.userToken,
    }),
    {
    }
)(Routing);