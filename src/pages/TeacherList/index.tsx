import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [ isFiltersVisible, setIsFiltersVisible] = useState(false);

    const [ subject, setSubject] = useState('');
    const [ week_day, setWeek_day] = useState('');
    const [ time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then( response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response); //tem que converter pq so vem em texto
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                }); 

                setFavorites(favoritedTeachersIds);
            }
        });
    }

    useFocusEffect(() => {
        // React.useCallback(() => {
            loadFavorites();
        //   }, []);
    });

    // useEffect(() => { //Serve para disparar assim que o componente é exibido em tela
    //     loadFavorites();
    // }, []);//se o array tiver vazio a função vai ser disparada só uma vez, se tiver variavel, vai ser disparada toda vez que a variavel mudar


    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFiltersSubmit() {
        loadFavorites();
        
        const response = await api.get('classes', { //so é possivel enviar os parametros por aqui diretamente se for do tipo POST/PUT
            params: {
                subject,
                week_day,
                time,
            }
        });

        setIsFiltersVisible(false);

        setTeachers(response.data);
    }
    return (
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#fff" />
                    </BorderlessButton>
                )}
                >
                { isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput  
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Qual a matéria?"
                            placeholderTextColor='#c1bccc'
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label} >Dia da semana</Text>
                                <TextInput 
                                    style={styles.input}
                                    onChangeText={text => setWeek_day(text)}                                   
                                    placeholder="Qual o dia?"
                                    placeholderTextColor='#c1bccc'
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label} >Horário</Text>
                                <TextInput 
                                    style={styles.input}
                                    onChangeText={text => setTime(text)}
                                    placeholder="Qual horário?"
                                    placeholderTextColor='#c1bccc'
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

        <ScrollView
            style={styles.teacherList}
            contentContainerStyle={{//é melhor para aplicar padding em scroll
                paddingHorizontal: 16,
                paddingBottom: 16,
            }}
        >
            {teachers.map((teacher: Teacher) => {
                return (
                    <TeacherItem 
                        key={teacher.id} 
                        teacher={teacher} 
                        favorited={favorites.includes(teacher.id)}
                    />)
            })}

        </ScrollView>
        </View>
    );
}

export default TeacherList;