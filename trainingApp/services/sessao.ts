import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// Nome da chave usada para armazenar a sessão
const CHAVE_SESSAO = 'trainingapp_sessao';

// Estrutura dos tokens recebidos do Django
export type Sessao = {
  access: string;
  refresh: string;
};

// SALVAR SESSÃO
export async function salvarSessao(sessao: Sessao): Promise<void> {
  const dados = JSON.stringify(sessao);

  if (Platform.OS === 'web') {
    // Armazenamento provisório para testes no navegador
    sessionStorage.setItem(CHAVE_SESSAO, dados);
    return;
  }

  // Armazenamento seguro no Android e iOS
  await SecureStore.setItemAsync(CHAVE_SESSAO, dados);
}

// RECUPERAR SESSÃO
export async function obterSessao(): Promise<Sessao | null> {
  let dados: string | null = null;

  if (Platform.OS === 'web') {
    dados = sessionStorage.getItem(CHAVE_SESSAO);
  } else {
    dados = await SecureStore.getItemAsync(CHAVE_SESSAO);
  }

  if (!dados) {
    return null;
  }

  try {
    const sessao = JSON.parse(dados);

    if (
      typeof sessao.access !== 'string' ||
      typeof sessao.refresh !== 'string'
    ) {
      return null;
    }

    return sessao as Sessao;
  } catch {
    return null;
  }
}

// REMOVER SESSÃO (LOGOUT)
export async function removerSessao(): Promise<void> {
  if (Platform.OS === 'web') {
    sessionStorage.removeItem(CHAVE_SESSAO);
    return;
  }

  await SecureStore.deleteItemAsync(CHAVE_SESSAO);
}