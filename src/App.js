import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Button, Spinner } from './components/common';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

class App extends Component {

    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp(
            {
                apiKey: 'AIzaSyDOW2qiIsa9IuGzTua-y1Sbt3QdnddRAUo',
                authDomain: 'auth-eb1ee.firebaseapp.com',
                databaseURL: 'https://auth-eb1ee.firebaseio.com',
                projectId: 'auth-eb1ee',
                storageBucket: 'auth-eb1ee.appspot.com',
                messagingSenderId: '702955558525'
            }
        );



        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }

        });
    }

    renderContent(){
        switch(this.state.loggedIn){
            case true:
                return <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>;
            case false:
                return <LoginForm />;
            default:
                return  <Spinner size='large' />;
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication"></Header>
                {this.renderContent()}

            </View>
        );

    }
}


export default App;