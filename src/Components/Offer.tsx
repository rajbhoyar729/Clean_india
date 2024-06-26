import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import colors from '../assets/Colors'
import sizes from '../assets/Sizes'
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

type NavigationProps = {
    onPress: () => void
}

export default function Offer(props: NavigationProps) {

const [loaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat.ttf'),
})

if(!loaded){
    return null;
}

 
}

const styles = StyleSheet.create({
    buttonText:{
        fontFamily: 'Montserrat',
        fontWeight: '700',
        fontSize: sizes.buttonTextSmall,
        color: colors.white,
        padding: 9,
    },
    buttonContainer:{
        backgroundColor: colors.green,
        borderRadius: 30,
        width: 101,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTwo:{
        marginLeft: -20,
    },
    sectionOne:{
        width: 180,
        paddingTop: 30,
        paddingLeft: 18,
    },
    wrapper:{
        display: 'flex',
        flexDirection: 'row',
    },
    textParagraph:{
        fontFamily: 'Montserrat',
        fontWeight: '700',
        fontSize: sizes.paragraphSizeSmaller,
        color: colors.secondary,
        marginBottom: 26,
    },
    textHeader:{
        fontFamily: 'Montserrat',
        fontWeight: '700',
        fontSize: sizes.menuText,
        textAlign: 'left',
        marginBottom: 6,
    },
    image:{
        width: 200,
        height: 150,
        marginTop: 20,
    },
    offerContainer:{
        height: 180,
        marginHorizontal: 35,
        marginBottom: 45,
        borderRadius: 30,
        elevation: 20,
      },
})