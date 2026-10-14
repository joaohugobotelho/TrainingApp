import React,{useState} from "react"

import {View, Text, TextInput, TouchableOpacity, StyleSheet,ActivityIndicator,
  KeyboardAvoidingView, Platform, } from 'react-native';
import { useRouter } from 'expo-router';


export default function Login(){
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [senha, setSenha]= useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro]= useState('');


    function entrar(){
        if (!email.trim() || !senha){
            setErro('Preencha seu e-mail e sua senha.');
            return;
        }

        setErro('');
        setCarregando(true);

         console.log('Login pronto para integração:', email);

         setCarregando(false);
         setErro('Tela pronta! Agora vamos conectar o login ao Django.'
         );
    }

    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
        <View style={styles.conteudo}>
            <Text style={styles.icone}>🏋️</Text> 

            <Text style={styles.titulo}>TrainingApp</Text>

            <Text style={styles.subtitulo}>ENTRE NA SUA CONTA</Text>

            <Text style={styles.descricao}>Acesse suas fichas e acomonhe sua evolução.</Text>

            <Text style={styles.label}>E-mail</Text>
            <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#94A3B8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            />

            <Text style={styles.label}>Senha</Text>
            <View style={styles.senhaContainer}>
                <TextInput
                style={styles.inputSenha}
                placeholder="Digite sua senha"
                placeholderTextColor="#94A3B8"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!mostrarSenha}
                autoCapitalize="none"
                />

                <TouchableOpacity
                onPress={() => setMostrarSenha(!mostrarSenha)}
                >   
                    <Text style={styles.mostrarSenha}>
                        {mostrarSenha ? 'Ocultar': 'Mostrar'}
                    </Text>
                </TouchableOpacity>
            </View>

            {erro!== '' && (
                <Text style={styles.erro}>{erro}</Text>
            )}

            <TouchableOpacity
            style={styles.botao}
            onPress={entrar}
            disabled={carregando}
            >
                {carregando ? (
                    <ActivityIndicator color="#101827" />
                ) : (
                    <Text style={styles.textoBotao}>
                        ENTRAR →
                    </Text>
                )}        
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=> router.push('/cadastro')}
            >
                <Text style={styles.cadastro}>
                    Não tem uma conta?{' '}
                    <Text style={styles.link}>Cadastre-se</Text>
                </Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101827',
    justifyContent: 'center',
    padding: 24,
  },
  conteudo: {
    width: '100%',
  },
  icone: {
    fontSize: 52,
    textAlign: 'center',
    marginBottom: 12,
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
    marginBottom: 35,
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
    marginBottom: 18,
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
    fontSize: 13,
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
  cadastro: {
    color: '#AAB8CB',
    textAlign: 'center',
    marginTop: 25,
  },
  link: {
    color: '#50D9A0',
    fontWeight: 'bold',
  },
});

