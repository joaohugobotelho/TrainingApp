import { obterSessao, salvarSessao, removerSessao } from "./sessao";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function obterTokenValido(): Promise<string | null> {
    const sessao = await obterSessao();

    if(!sessao) {
        return null;
    }

    try {
        const resposta = await fetch(
  `${API_URL}/api/usuarios/token/refresh/`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh: sessao.refresh,
    }),
  }
);

        console.log('Status da renovação JWT:', resposta.status);

        if (!resposta.ok) {
            if(resposta.status === 401) {
                await removerSessao();
            }
            return null;
        }

        const dados = await resposta.json();

        if(typeof dados.access !== 'string') {
            return null;
        }

        await salvarSessao({
            access: dados.access,
            refresh: dados.refresh ?? sessao.refresh,
        });

        return dados.access;
    } catch (error) {
        console.error('Erro ao renovar token:' ,error);
        return null;
    }
}