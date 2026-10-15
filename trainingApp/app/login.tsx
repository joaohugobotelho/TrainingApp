
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { useRouter } from 'expo-router';
import { useTema } from '../temas/TemaContext';

export default function Login() {
  const router = useRouter();

  const { modo, cores, alternarTema } = useTema();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  function entrar() {
    if (!email.trim() || !senha) {
      setErro('Preencha seu e-mail e sua senha.');
      return;
    }

    setErro('');
    setCarregando(true);

    // Ainda vamos conectar este botão à API Django.
    console.log('Login pronto para integração:', email);

    setCarregando(false);
    setErro('Login ainda não conectado ao Django.');
  }

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { backgroundColor: cores.fundo },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.conteudo}>

          {/* BOTÃO DE ALTERAR TEMA */}
          <TouchableOpacity
            onPress={alternarTema}
            style={styles.botaoTema}
          >
            <Text
              style={[
                styles.textoTema,
                { color: cores.destaque },
              ]}
            >
              {modo === 'escuro'
                ? '☀️ Modo claro'
                : '🌙 Modo escuro'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.icone}>🏋️</Text>

          <Text
            style={[
              styles.titulo,
              { color: cores.texto },
            ]}
          >
            TrainingApp
          </Text>

          <Text
            style={[
              styles.subtitulo,
              { color: cores.destaque },
            ]}
          >
            ENTRE NA SUA CONTA
          </Text>

          <Text
            style={[
              styles.descricao,
              { color: cores.secundario },
            ]}
          >
            Acesse suas fichas e acompanhe sua evolução.
          </Text>

          {/* EMAIL */}
          <Text
            style={[
              styles.label,
              { color: cores.texto },
            ]}
          >
            E-mail
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: cores.superficie,
                borderColor: cores.borda,
                color: cores.texto,
              },
            ]}
            placeholder="Digite seu e-mail"
            placeholderTextColor={cores.secundario}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          {/* SENHA */}
          <Text
            style={[
              styles.label,
              { color: cores.texto },
            ]}
          >
            Senha
          </Text>

          <View
            style={[
              styles.senhaContainer,
              {
                backgroundColor: cores.superficie,
                borderColor: cores.borda,
              },
            ]}
          >
            <TextInput
              style={[
                styles.inputSenha,
                { color: cores.texto },
              ]}
              placeholder="Digite sua senha"
              placeholderTextColor={cores.secundario}
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
              autoCapitalize="none"
            />

            <TouchableOpacity
              onPress={() => setMostrarSenha(!mostrarSenha)}
            >
              <Text
                style={[
                  styles.mostrarSenha,
                  { color: cores.destaque },
                ]}
              >
                {mostrarSenha ? 'Ocultar' : 'Mostrar'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* MENSAGEM DE ERRO */}
          {erro !== '' && (
            <Text style={styles.erro}>{erro}</Text>
          )}

          {/* BOTÃO ENTRAR */}
          <TouchableOpacity
            style={[
              styles.botao,
              { backgroundColor: cores.destaque },
            ]}
            onPress={entrar}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color={cores.textoBotao} />
            ) : (
              <Text
                style={[
                  styles.textoBotao,
                  { color: cores.textoBotao },
                ]}
              >
                ENTRAR →
              </Text>
            )}
          </TouchableOpacity>

          {/* CADASTRO */}
          <TouchableOpacity
            onPress={() => router.push('/cadastro')}
          >
            <Text
              style={[
                styles.cadastro,
                { color: cores.secundario },
              ]}
            >
              Não tem uma conta?{' '}
              <Text
                style={[
                  styles.link,
                  { color: cores.destaque },
                ]}
              >
                Cadastre-se
              </Text>
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },

  conteudo: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
  },

  botaoTema: {
    alignSelf: 'flex-end',
    padding: 12,
    marginBottom: 10,
  },

  textoTema: {
    fontSize: 15,
    fontWeight: '600',
  },

  icone: {
    fontSize: 52,
    textAlign: 'center',
    marginBottom: 12,
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },

  descricao: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 14,
    marginBottom: 35,
  },

  label: {
    fontSize: 15,
    marginBottom: 8,
    fontWeight: '500',
  },

  input: {
    borderRadius: 12,
    padding: 17,
    marginBottom: 20,
    borderWidth: 1,
  },

  senhaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 18,
  },

  inputSenha: {
    flex: 1,
    padding: 17,
  },

  mostrarSenha: {
    paddingHorizontal: 12,
    fontWeight: '600',
  },

  erro: {
    color: '#EF4444',
    fontSize: 13,
    marginBottom: 15,
  },

  botao: {
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
  },

  textoBotao: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  cadastro: {
    textAlign: 'center',
    marginTop: 25,
  },

  link: {
    fontWeight: 'bold',
  },
});
