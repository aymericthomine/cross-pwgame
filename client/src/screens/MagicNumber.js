import React, { useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import TextInput from '../components/TextInput'
import {io} from "socket.io-client"
import UserContext from '../core/User'
import { useContext, useEffect } from 'react'
import { SocketContext} from '../core/Socket'
import { Modal, Text, Pressable, StyleSheet, View, Alert } from "react-native"


export default function MagicNumber({ navigation }) {    
    const [number, setNumber] = useState({ value: '', error: '' })
    const {user} = useContext(UserContext)
    const socket = useContext(SocketContext)

    const onSendPressed = () => {
        setNumber({ ...number})
        console.log(`Sent value ${number.value} to the socket`)
        socket.emit('number',{ username : user.name.text, number: number.value})
        setNumber({value:'',error:''})
    }
    useEffect(() => {
        const victoryListener = msg => {
            console.log(`Number : ${msg.number} found by ${msg.username}`)
            Alert.alert(
                `number : ${msg.number} found by ${msg.username}`,
                "",
                [
                    {
                        text: "Cancel",
                    },
                    {
                        text: "OK",
                    }
                ]
            )
            //Popup saying who found the number (msg.username) and the number (msg.number)
        }
        const gameOverListener = msg => {
            console.log(`game won by ${msg.username}`)
            Alert.alert(
                `Game won by ${msg.username}`,
                `Leaderboard : \n
                ${Object.entries(msg.scoreBoard).map(([key, value])=> {
                    return(`${key} : ${value} points`)
                })}`,
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("cancel pressed"),
                    },
                    {
                        text: "OK",
                        onPress: () => console.log("ok pressed")
                    }
                ]
            )
            //Render new screen, with un tableau des scores (msg)
        }
        socket.on('victory',victoryListener)
        socket.on('gameOver',gameOverListener)


        return () => {
            socket.off('victory', victoryListener);
            socket.off('gameOver', gameOverListener)
         }
    },[])
  return (
    <Background>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>Find the random number between 0 and 1337</Header>
        <TextInput
            label="Number"
            returnKeyType="next"
            keyboardType = 'phone-pad'
            value={number.value}
            onChangeText={(text) => setNumber({ value: text, error: '' })}
            autoCapitalize="none"
        />
        <Button mode="contained" onPress={onSendPressed}>
            Send
        </Button>
        <Header>{user.name.text}</Header>
    </Background>
  )
}

