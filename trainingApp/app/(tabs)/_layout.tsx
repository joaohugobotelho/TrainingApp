
import { Tabs, Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useTema } from '../../temas/TemaContext';
import { obterTokenValido } from '../../services/autenticacao';

export default function TabLayout() {
  const { cores } = useTema();

  const [carregando, setCarregando] = useState(true);
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function verificarAutenticacao() {
      try {
        const token = await obterTokenValido();

        console.log('Token válido recebido?', Boolean(token));

        if (ativo) {
          setAutenticado(Boolean(token));
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);

        if (ativo) {
          setAutenticado(false);
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    verificarAutenticacao();

    return () => {
      ativo = false;
    };
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

  if (!autenticado) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: cores.destaque,
        tabBarInactiveTintColor: cores.secundario,
        tabBarStyle: {
          backgroundColor: cores.superficie,
          borderTopColor: cores.borda,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="house.fill"
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="paperplane.fill"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
