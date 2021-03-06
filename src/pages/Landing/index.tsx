import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler'; //vem junto com o pacote de rotas

import api from '../../services/api';

import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

function Landing() {
    const { navigate } = useNavigation();

    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('connections').then( response => {// a '/' é opcional e é uma promisse
            console.log(response);
            const { total } = response.data;

            setTotalConnections(total);
        }) 
    }, []);

    function handleNavigationToGiveClassesPage() {
        navigate('GiveClasses');
    }

    function handleNavigateToStudyPages() {
        navigate('Study');
    }

    return (
        <View style={styles.container}>
            <Image source={landingImg} style={styles.banner}/>
        
            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>O que deseja fazer?</Text> {/*'Text' é a unica tag que herda estilização*/}
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton 
                    onPress={handleNavigateToStudyPages} 
                    style={[styles.button, styles.buttonsPrimary]}>
                    <Image source={studyIcon} />

                    <Text style={styles.buttonsText}>Estudar</Text>
                </RectButton>
               
                <RectButton 
                onPress={handleNavigationToGiveClassesPage} 
                style={[styles.button, styles.buttonsSecundary]}>

                    <Image source={giveClassesIcon} />                    

                    <Text style={styles.buttonsText}>Dar aulas</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de {totalConnections} conexões já realizadas {' '}
                <Image source={heartIcon} />
            </Text>

        </View>
    );
}

export default Landing;