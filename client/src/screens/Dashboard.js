import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import BackButton from '../components/BackButton'



export default function Dashboard({ navigation }) {

  return (
    <Background>
        <Logo />
        <Header>Let’s start to play :</Header>
    
        <Header></Header>
        <Button
        mode="yellow"
        onPress={() => navigation.navigate('MagicNumber')}
        >
            Magic Number
        </Button>
        <Button
        mode="yellow"
        onPress={() => navigation.navigate('QuickWord')}
      >
        Quick Word
      </Button>
      <Header></Header>
      <Button
            mode="black"
            onPress={() =>
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'StartScreen' }],
                  })
            }
        >
        Logout
        </Button>
    </Background>
  )
}