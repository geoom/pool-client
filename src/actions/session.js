import { reset } from 'redux-form';
import api from '../api';
import { fetchUserRooms } from './rooms';

function setCurrentUser(dispatch, response) {
    localStorage.setItem('token', JSON.stringify(response.meta.token));
    dispatch({ type: 'AUTHENTICATION_SUCCESS', response });
    dispatch(fetchUserRooms(response.data.id))
}

export function signin(data, router) {
    return dispatch => api.post('/sessions', data)
        .then((response) => {
            setCurrentUser(dispatch, response);
            dispatch(reset('signin'));
            router.transitionTo('/');
        });
}

export function signup(data, router) {
    return dispatch => api.post('/users', data)
        .then((response) => {
            setCurrentUser(dispatch, response);
            dispatch(reset('signup'));
            router.transitionTo('/');
        });
}

export function signout(router) {
    return dispatch => api.delete('/sessions')
        .then(() => {
            localStorage.removeItem('token');
            dispatch({ type: 'LOGOUT' });
            router.transitionTo('/signin');
        });
}

export function authenticate(){
    return (dispatch) => {
        dispatch({ type: 'AUTHENTICATION_REQUEST' });

        return api.post('/sessions/refresh')
            .then((response) => {
                setCurrentUser(dispatch, response);
            })
            .catch(() => {
                localStorage.removeItem('token');
                window.location = '/signin';
            });
    };
}

export const unauthenticate = () => ({ type: 'AUTHENTICATION_FAILURE' });