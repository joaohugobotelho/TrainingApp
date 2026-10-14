import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function Cadastro(){
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email,setEmail] = useState('');
  const [senha, setSenha]= useState('');
  const [confirmarSenha, setConfirmarSenha]= useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro]= useState('');
  const [sucesso, setSucesso] =useState('');

  function cadastrar(){
    setErro('');
    setSucesso('');

    if (
      !nome.trim() ||
      !email.trim()||
      !senha ||
      !confirmarSenha
    ) {
      setErro('Preencha todos os campos.')
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErro('Digite um e-mail válido.');
      return;
    }

    if (senha !==confirmarSenha){
      setErro('As senha não conincidem.')
      return;
    }

    // Na próxima etapa, enviaremos ao Django.
    console.log('Dados de cadastro validados:', {
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
    });

    setSucesso(
      'Formulário validado! Agora vamos conectar ao Django.'
    );
  }

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS==='ios' ? 'padding' : undefined}
    >
      <ScrollView
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.icone}>🏋️</Text>
        <Text style={styles.titulo}>
          TrainingApp
        </Text>

        <Text style={styles.subtitulo}>CRIE SUA CONTA</Text>

        <Text style={styles.descricao}>Comece sua evolução com treinos personalizados.</Text>

        <Text style={styles.label}>Nome completo</Text>

        <TextInput
        style={styles.input}
        placeholder='Digite seu nome'
        placeholderTextColor="#94A3B8"
        value={nome}
        onChangeText={setNome}
        autoCapitalize='words'
        autoComplete='name'
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
        style={styles.input}
        placeholder='Digite seu e-mail'
        placeholderTextColor="#94A3B8"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize='none'
        autoComplete='email'
        />

        <Text style={styles.label}>Senha</Text>

      <View style={styles.senhaContainer}>
        <TextInput
        style={styles.input}
        placeholder='Crie uma senha'
        placeholderTextColor="#94A3B8"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={!mostrarSenha}
        autoCapitalize='none'
        autoComplete='new-password'
        />

        <TouchableOpacity
        onPress={()=> setMostrarSenha(!mostrarSenha)}
        >
          <Text style={styles.mostrarSenha}>
            {mostrarSenha ? 'Ocultar' : 'Mostrar'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Confirmar senha</Text>

      <TextInput
      style={styles.input}
      placeholder='Digite sua senha novamente'
      placeholderTextColor="94A3B8"
      value={confirmarSenha}
      onChangeText={setConfirmarSenha}
      secureTextEntry={!mostrarSenha}
      autoCapitalize="none"
      autoComplete="new-password"
      />

      {erro !== '' && (
        <Text style={styles.erro}>{erro}</Text>
      )}

      {sucesso !== '' && (
        <Text style={styles.sucesso}>{sucesso}</Text>
      )}
      <TouchableOpacity
      style={styles.botao} onPress={cadastrar}>
        <Text style={styles.textoBotao}>CRIAR CONTA →        
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/login')}
      >
        <Text style={styles.login}>Já possui uma conta?{' '}        
        </Text>
      </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101827',
  },

  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    paddingVertical: 45,
  },

  icone: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 10,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitulo: {
    color: '#50D9A0',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },

  descricao: {
    color: '#AAB8CB',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 14,
    marginBottom: 30,
  },

  label: {
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#1B293B',
    borderRadius: 12,
    padding: 17,
    color: '#FFFFFF',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#344256',
  },

  senhaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#344256',
    marginBottom: 20,
  },

  inputSenha: {
    flex: 1,
    padding: 17,
    color: '#FFFFFF',
  },

  mostrarSenha: {
    color: '#50D9A0',
    paddingHorizontal: 12,
  },

  erro: {
    color: '#FCA5A5',
    fontSize: 14,
    marginBottom: 15,
  },

  sucesso: {
    color: '#50D9A0',
    fontSize: 14,
    marginBottom: 15,
  },

  botao: {
    backgroundColor: '#50D9A0',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
  },

  textoBotao: {
    color: '#101827',
    fontSize: 16,
    fontWeight: 'bold',
  },

  login: {
    color: '#AAB8CB',
    textAlign: 'center',
    marginTop: 25,
  },

  link: {
    color: '#50D9A0',
    fontWeight: 'bold',
  },
});