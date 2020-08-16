import { fromPromise } from 'rxjs/observable/fromPromise'
import { of } from 'rxjs'
import { mergeMap, flatMap, catchError } from 'rxjs/operators'
import { Record } from 'immutable'
import { assign } from 'lodash'
import { ofType, combineEpics } from 'redux-observable'

import { INIT, LOADING, SUCCESS, ERROR } from '../../Constants/phase'

import * as api from './api'

import AsyncStorage from '@react-native-community/async-storage';

/***********************************
 * Action Types
 **********************************/

export const LOGIN_USER = 'machineTest/user/LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'machineTest/user/LOGIN_USER_SUCCESS'
export const LOGIN_USER_ERROR = 'machineTest/user/LOGIN_USER_ERROR'

/***********************************
 * Initial State
 ***********/

const InitialStateInterface = {
    initial: 'Login is enabled for this application',
    phase: INIT,
    error: null,
    isSubmitting: false,
    message: null,
    token: null,
    isLoading: true,
    userName: null,
    userToken: null
}

class InitialState extends Record(InitialStateInterface) {
    constructor(desiredValues) {
        // When we construct InitialState, we automatically update it's default value
        // for token to be what is stored in localStorage
        const token = '' // localStorage.getItem(Config.LocalStorageKeys.Authorization)
        super(assign({ token }, desiredValues))
    }
}

/***********************************
 * Reducer
 ***********/

export default function (state = new InitialState(), action = {}) {
    switch (action.type) {

        case LOGIN_USER: {
            return state
                .set('phase', LOADING)
                .set('error', null)
                .set('userToken', null)
        }

        case LOGIN_USER_SUCCESS: {
            const { payload } = action
            console.log(payload.token, 'payload-coming')
            const token = AsyncStorage.setItem('userToken', payload.token)
            return state
                .set('phase', SUCCESS)
                .set('message', payload.message)
                .set('error', null)
                .set('userToken', token)
        }

        case LOGIN_USER_ERROR: {
            const { payload } = action
            return state
                .set('phase', ERROR)
                .set('error', payload.message)
        }

        default: {
            return state
        }
    }
}

/***********************************
* Action Creators
***********/
export const loginUser = credentials => {
    return {
        type: LOGIN_USER,
        payload: credentials
    }
}

/***********************************
 * Epics
 ***********************************/
const loginUserEpic = action$ =>
    action$.pipe(
        ofType(LOGIN_USER),
        mergeMap(action => {
            return fromPromise(api.loginUser(action.payload)).pipe(
                flatMap(payload => [{
                    type: LOGIN_USER_SUCCESS,
                    payload
                }
                ]),
                catchError(error =>
                    of({
                        type: LOGIN_USER_ERROR,
                        payload: { error }
                    })
                )
            )
        })
    )

export const userEpic = combineEpics(
    loginUserEpic
)