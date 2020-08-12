import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

{/* não precisa do 'NavigationContainer' pois esta navegação em abas esta dentro da navegação em pilhas, que ja tem esse elemento*/}

function StudyTabs() {
    return (
        <Navigator 
            tabBarOptions={{
                style: {
                    elevation: 0, //propriedade de sombra
                    shadowOpacity: 0, //Para tira a sombra do IOs
                    height: 64,
                },

                tabStyle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
              
                iconStyle: {
                    flex: 0,
                    width: 20,
                    height: 20,
                
                },
                
                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16,
                },
                inactiveBackgroundColor: '#fafafc', //cor de fundo quando não esta selecionada
                activeBackgroundColor: '#ebebf5',
                inactiveTintColor: '#c1bccc',
                activeTintColor: '#32264d',
            }}
        > 
            <Screen 
                name="TeacherList" 
                component={TeacherList} 
                options={{
                    tabBarLabel: 'Proffys',
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Ionicons name="ios-easel" color={color} size={size} />
                        );
                    }
                }}
            />             
            <Screen 
                name="Favorites"
                component={Favorites} 
                options={{
                    tabBarLabel: 'Favoritos',
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Ionicons name="ios-heart" color={color} size={size} />
                        );
                    }
                }}
            />             
        </Navigator>
    );
}

export default StudyTabs;