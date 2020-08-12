import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1, //para ocupar todo o espaço em tela        
        backgroundColor: '#f0f0f7',
        justifyContent: 'center',
        padding: 40,
    },

    banner: {
        width: '100%',
        resizeMode: 'contain', //redimenciona proporcionalmente, para todo conteudo da imagem apareça
        
    },

    title: {
        fontFamily: 'Poppins_400Regular',
        color: '#fff',
        fontSize: 20,
        lineHeight: 30,
        marginTop: 80,
    },

    titleBold: {
        fontFamily: 'Poppins_600SemiBold',
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-between',
    },
   
    button: {
        height: 150,
        width: '48%',
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 24,
        justifyContent: 'space-between',
    },
    
    buttonsPrimary: {
        backgroundColor: '#9871f5',
    },
    
    buttonsSecundary: {
        backgroundColor: '#04d361',
    },

    buttonsText: {
        fontFamily: 'Archivo_700Bold',
        color: '#fff',
        fontSize: 20,
    },

    totalConnections: {
        fontFamily: 'Poppins_400Regular',
        color: '#d4c2ff',
        fontSize: 12,
        lineHeight: 20,
        maxWidth: 140,
        marginTop: 40,
    }
});

export default styles;