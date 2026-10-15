import { Redirect } from "expo-router";
import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, StatusBar, Alert,} from "react-native";


export default function HomeScreen(){

  function iniciarFichario(){
    Alert.alert('TrainingApp', 'Em breve vamos criar o fichário!');
  }


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"/>

      <View style={styles.conteudo}>
        <Text style={styles.icone}>🏋️</Text>

        <Text style={styles.titulo}>
          TrainingApp
        </Text>

        <Text style={styles.subtitulo}>
          SEU TREINO. SUA EVOLUÇÃO.
        </Text>

        <Text style={styles.descricao}>
          Treinos personalizados para todos os níveis, do iniciante ao avançado.
        </Text>

        <TouchableOpacity
        style={styles.botao} onPress={iniciarFichario}>

          <Text style={styles.textoBotao}>
            COMEÇAR MEU TREINO →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101827',
    justifyContent: 'center',
    padding: 24,
  },

  conteudo:{
    alignItems:'center',
  },
  icone:{
    fontSize:65,
    marginBottom:25,
  },
  titulo:{
    fontSize:36,
    fontWeight: 'bold',
    color:'#FFFFFF',
    marginBottom:10,
  },

  subtitulo:{
    fontSize: 14,
    fontWeight: 'bold',
    color: '#50D9A0',
    marginBottom: 20,
  },
  descricao:{
    fontSize:16,
    color:'#C5CDDA',
    textAlign:'center',
    marginBottom: 40,
    lineHeight: 25,
  },
  botao:{
    backgroundColor: '#50D9A0',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: '100%',
    alignItems:'center',
  },

  textoBotao:{
    color:'#101827',
    fontSize:16,
    fontWeight:'bold',
  },
})
