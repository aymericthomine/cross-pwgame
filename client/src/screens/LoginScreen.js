import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import Button from '../components/Button'

import UserContext from '../core/User'
import { useContext } from 'react'

export default function LoginScreen({ navigation }){

    const {user, setUsername} = useContext(UserContext)
    const onLoginPressed = () => {

        setUsername(user.name)

      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      })
    }
    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Login</Header>
            <Button
                title= "StartScreen"
                onPress={() => navigation.navigate('LoginScreen')}
            >
            </Button>
            <TextInput
                label="Username"
                returnKeyType="next"
                value={user.name.value}
                onChangeText={(text) => setUsername({text})}
                autoCapitalize="none"
            />
            <Button mode="contained" onPress={onLoginPressed}>
                Login
            </Button>
        </Background>
    )
  }