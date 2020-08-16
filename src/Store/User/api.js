import { fetch } from '../../Utils';

const HOSTNAME = 'https://reqres.in';

// login user

export const loginUser = credentials => {
    return fetch(`https://reqres.in/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(res => {
            return res.json()
        })
        .then(payload => {
            return payload
        })
        .catch(error => {
            throw error
        })
}