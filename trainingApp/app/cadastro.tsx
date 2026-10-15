
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
  ActivityIndicator,
} from 'react-native';

import { useRouter } from 'expo-router';
import { useTema } from '../temas/TemaContext';

export default function Cadastro() {
  const router = useRouter();

  const { modo, cores, alternarTema } = useTema();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function cadastrar() {
    setErro('');
    setSucesso('');

    if (
      !nome.trim() ||
      !email.trim() ||
      !senha ||
      !confirmarSenha
    ) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErro('Digite um e-mail válido.');
      return;
    }

    if (senha.length < 8) {
      setErro('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    setCarregando(true);

    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;

      if (!apiUrl) {
        setErro('Endereço da API não configurado.');
        return;
      }

      const resposta = await fetch(
        `${apiUrl}/api/usuarios/cadastro/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: nome.trim(),
            email: email.trim().toLowerCase(),
            password: senha,
          }),
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        const mensagem =
          dados.email?.[0] ||
          dados.password?.[0] ||
          dados.nome?.[0] ||
          dados.detail ||
          'Não foi possível criar sua conta.';

        setErro(String(mensagem));
        return;
      }

      setSucesso('Conta criada com sucesso! Faça seu login.');

      setSenha('');
      setConfirmarSenha('');

    } catch (error) {
      console.error('Erro de cadastro:', error);

      setErro('Não foi possível conectar ao servidor Django.');
    } finally {
      setCarregando(false);
    }
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
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formulario}>

          {/* BOTÃO PARA ALTERNAR O TEMA */}
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
            CRIE SUA CONTA
          </Text>

          <Text
            style={[
              styles.descricao,
              { color: cores.secundario },
            ]}
          >
            Comece sua evolução com treinos personalizados.
          </Text>

          {/* NOME */}
          <Text style={[styles.label, { color: cores.texto }]}>
            Nome completo
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
            placeholder="Digite seu nome"
            placeholderTextColor={cores.secundario}
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
            autoComplete="name"
          />

          {/* EMAIL */}
          <Text style={[styles.label, { color: cores.texto }]}>
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
          <Text style={[styles.label, { color: cores.texto }]}>
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
              placeholder="Crie uma senha"
              placeholderTextColor={cores.secundario}
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
              autoCapitalize="none"
              autoComplete="new-password"
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

          {/* CONFIRMAR SENHA */}
          <Text style={[styles.label, { color: cores.texto }]}>
            Confirmar senha
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
            placeholder="Digite sua senha novamente"
            placeholderTextColor={cores.secundario}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry={!mostrarSenha}
            autoCapitalize="none"
            autoComplete="new-password"
          />

          {/* MENSAGENS */}
          {erro !== '' && (
            <Text style={styles.erro}>{erro}</Text>
          )}

          {sucesso !== '' && (
            <Text style={styles.sucesso}>{sucesso}</Text>
          )}

          {/* BOTÃO CRIAR CONTA */}
          <TouchableOpacity
            style={[
              styles.botao,
              { backgroundColor: cores.destaque },
            ]}
            onPress={cadastrar}
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
                CRIAR CONTA →
              </Text>
            )}
          </TouchableOpacity>

          {/* VOLTAR PARA LOGIN */}
          <TouchableOpacity
            onPress={() => router.replace('/login')}
          >
            <Text
              style={[
                styles.login,
                { color: cores.secundario },
              ]}
            >
              Já possui uma conta?{' '}
              <Text
                style={[
                  styles.link,
                  { color: cores.destaque },
                ]}
              >
                Entrar
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

  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    paddingVertical: 45,
  },

  formulario: {
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
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 10,
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
    marginBottom: 30,
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
    marginBottom: 20,
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
    fontSize: 14,
    marginBottom: 15,
  },

  sucesso: {
    color: '#16A34A',
    fontSize: 14,
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

  login: {
    textAlign: 'center',
    marginTop: 25,
  },

  link: {
    fontWeight: 'bold',
  },
});
