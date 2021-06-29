import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import Button from '../components/Button'

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
  
    const onLoginPressed = () => {

        setUsername({ ...username})
        setPassword({ ...password})

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
                value={username.value}
                onChangeText={(text) => setUsername({ value: text, error: '' })}
                autoCapitalize="none"
            />
        </Background>
    )
  }