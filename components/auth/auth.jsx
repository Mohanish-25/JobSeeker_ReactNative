import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as firebase from 'firebase';
import 'firebase/auth';

export default function AuthScreen() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const handleSignInWithEmailPassword = async (email, password) => {
        try {
            setLoading(true);
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const { type, user } = await Google.logInAsync({
                androidClientId: 'YOUR_ANDROID_CLIENT_ID',
                iosClientId: 'YOUR_IOS_CLIENT_ID',
            });

            if (type === 'success') {
                const credential = firebase.auth.GoogleAuthProvider.credential(
                    user.auth.idToken
                );
                await firebase.auth().signInWithCredential(credential);
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {user ? (
                <View>
                    <Text>Welcome, {user.email}</Text>
                    <Button title="Sign Out" onPress={() => firebase.auth().signOut()} />
                </View>
            ) : (
                <View>
                    <Button
                        title="Sign In with Google"
                        onPress={handleGoogleSignIn}
                        disabled={loading}
                    />
                    <Button
                        title="Sign In with Email/Password"
                        onPress={() => handleSignInWithEmailPassword('test@example.com', 'password')}
                        disabled={loading}
                    />
                </View>
            )}
        </View>
    );
}
