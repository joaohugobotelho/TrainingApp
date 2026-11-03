import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { useRouter } from 'expo-router';
import { useTema } from '../../temas/TemaContext';
import { removerSessao } from '@/services/sessao';

export default function HomeScreen() {
  const router = useRouter();
  const { cores } = useTema();

  async function sairDaConta() {
    try {
      await removerSessao();
      router.replace('/login');
    } catch (error) {
      console.error('Erro ao sair da conta:', error);
    }
  }

  function iniciarFichario() {
    router.push('/fichario');
  }

  return (
  <View
    style={[
      styles.container,
      { backgroundColor: cores.fundo },
    ]}
  >
    
    <TouchableOpacity
      style={[
        styles.botaoSair,
        { borderColor: cores.borda },
      ]}
      onPress={sairDaConta}
    >
      <Text style={{ color: cores.secundario, fontWeight: 'bold' }}>
        SAIR
      </Text>
    </TouchableOpacity>

    
    <View style={styles.conteudo}>
      <Text style={styles.icone}>🏋️</Text>

      <Text style={[styles.titulo, { color: cores.texto }]}>
        TrainingApp
      </Text>

      <Text style={[styles.subtitulo, { color: cores.destaque }]}>
        SEU TREINO. SUA EVOLUÇÃO.
      </Text>

      <Text style={[styles.descricao, { color: cores.secundario }]}>
        Treinos personalizados para todos os níveis,
        do iniciante ao avançado.
      </Text>

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: cores.destaque }]}
        onPress={iniciarFichario}
      >
        <Text style={[styles.textoBotao, { color: cores.textoBotao }]}>
          COMEÇAR MEU TREINO →
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },

  conteudo: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },

  icone: {
    fontSize: 65,
    marginBottom: 25,
  },

  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  descricao: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 25,
  },

  botao: {
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },

  textoBotao: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoSair: {
  position: 'absolute',
  top: 25,
  right: 24,
  paddingVertical: 10,
  paddingHorizontal: 18,
  borderRadius: 10,
  borderWidth: 1,
  zIndex: 10,
  backgroundColor:'#d30404',
},

textoSair: {
  fontSize: 14,
  fontWeight:'bold'
},
});