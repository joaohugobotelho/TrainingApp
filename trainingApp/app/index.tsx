import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { obterSessao } from '../services/sessao';
import { useTema } from '../temas/TemaContext';

export default function Index() {
  const { cores } = useTema();

  const [carregando, setCarregando] = useState(true);
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    async function verificarSessao() {
      try {
        const sessao = await obterSessao();

        setAutenticado(Boolean(sessao?.access));
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
        setAutenticado(false);
      } finally {
        setCarregando(false);
      }
    }

    verificarSessao();
  }, []);

  if (carregando) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: cores.fundo,
        }}
      >
        <ActivityIndicator
          size="large"
          color={cores.destaque}
        />
      </View>
    );
  }

  return <Redirect href={autenticado ? '/(tabs)' : '/login'} />;
}