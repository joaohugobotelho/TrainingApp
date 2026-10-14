
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

type Respostas = {
  idade: string;
  objetivo: string;
  experiencia: string;
  dias: string;
  tempo: string;
  local: string;
  equipamentos: string[];
  limitacoes: string;
  descricaoLimitacoes: string;
  prioridade: string;
};

type Campo = keyof Respostas;

type Pergunta = {
  titulo: string;
  campo: Campo;
  tipo: 'numero' | 'opcao' | 'multipla' | 'limitacoes';
  opcoes?: string[];
};

const perguntas: Pergunta[] = [
  {
    titulo: 'Qual é a sua idade?',
    campo: 'idade',
    tipo: 'numero',
  },
  {
    titulo: 'Qual é o seu objetivo?',
    campo: 'objetivo',
    tipo: 'opcao',
    opcoes: [
      'Hipertrofia',
      'Emagrecimento',
      'Força',
      'Condicionamento',
    ],
  },
  {
    titulo: 'Qual é seu nível de experiência?',
    campo: 'experiencia',
    tipo: 'opcao',
    opcoes: [
      'Iniciante',
      'Intermediário',
      'Avançado',
    ],
  },
  {
    titulo: 'Quantos dias por semana pode treinar?',
    campo: 'dias',
    tipo: 'opcao',
    opcoes: ['2', '3', '4', '5', '6'],
  },
  {
    titulo: 'Quanto tempo você tem por treino?',
    campo: 'tempo',
    tipo: 'opcao',
    opcoes: [
      '30 minutos',
      '45 minutos',
      '60 minutos',
      '90 minutos',
    ],
  },
  {
    titulo: 'Onde você pretende treinar?',
    campo: 'local',
    tipo: 'opcao',
    opcoes: [
      'Academia completa',
      'Academia de condomínio',
      'Em casa',
    ],
  },
  {
    titulo: 'Quais equipamentos você tem disponíveis?',
    campo: 'equipamentos',
    tipo: 'multipla',
    opcoes: [
      'Máquinas',
      'Halteres',
      'Barras e anilhas',
      'Banco de musculação',
      'Elásticos',
      'Peso corporal',
    ],
  },
  {
    titulo: 'Possui alguma lesão ou limitação física?',
    campo: 'limitacoes',
    tipo: 'limitacoes',
    opcoes: [
      'Não',
      'Tenho lesão',
      'Sinto dores',
      'Tenho restrição médica',
    ],
  },
  {
    titulo: 'Qual grupo muscular deseja priorizar?',
    campo: 'prioridade',
    tipo: 'opcao',
    opcoes: [
      'Nenhum específico',
      'Peito',
      'Costas',
      'Pernas',
      'Braços',
      'Ombros',
      'Glúteos',
    ],
  },
];

export default function Fichario() {
  const router = useRouter();

  const [etapa, setEtapa] = useState(0);
  const [revisao, setRevisao] = useState(false);
  const [erro, setErro] = useState('');

  const [respostas, setRespostas] = useState<Respostas>({
    idade: '',
    objetivo: '',
    experiencia: '',
    dias: '',
    tempo: '',
    local: '',
    equipamentos: [],
    limitacoes: '',
    descricaoLimitacoes: '',
    prioridade: '',
  });

  const perguntaAtual = perguntas[etapa];

  function atualizarResposta(
    campo: Campo,
    valor: string | string[]
  ) {
    setRespostas((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));

    setErro('');
  }

  function selecionarEquipamento(equipamento: string) {
    const atuais = respostas.equipamentos;

    const novos = atuais.includes(equipamento)
      ? atuais.filter((item) => item !== equipamento)
      : [...atuais, equipamento];

    atualizarResposta('equipamentos', novos);
  }

  function validarEtapa() {
    const campo = perguntaAtual.campo;
    const valor = respostas[campo];

    if (perguntaAtual.tipo === 'numero') {
      const idade = Number(respostas.idade);

      if (
        !/^\d+$/.test(respostas.idade.trim()) ||
        idade < 18 ||
        idade > 100
      ) {
        setErro('Informe uma idade entre 18 e 100 anos.');
        return false;
      }
    } else if (Array.isArray(valor)) {
      if (valor.length === 0) {
        setErro('Selecione pelo menos uma opção.');
        return false;
      }
    } else if (!valor.trim()) {
      setErro('Selecione uma resposta para continuar.');
      return false;
    }

    if (
      campo === 'limitacoes' &&
      respostas.limitacoes !== 'Não' &&
      !respostas.descricaoLimitacoes.trim()
    ) {
      setErro('Descreva sua limitação antes de continuar.');
      return false;
    }

    setErro('');
    return true;
  }

  function continuar() {
    if (!validarEtapa()) {
      return;
    }

    if (etapa < perguntas.length - 1) {
      setEtapa(etapa + 1);
    } else {
      setRevisao(true);
    }
  }

  function voltar() {
    setErro('');

    if (revisao) {
      setRevisao(false);
    } else if (etapa > 0) {
      setEtapa(etapa - 1);
    } else {
      router.back();
    }
  }

  function finalizar() {
    console.log('Fichário completo:', respostas);

    if (respostas.limitacoes !== 'Não') {
      setErro(
        'Você informou uma limitação física. Antes de gerar ' +
        'um treino, será necessário considerar a orientação ' +
        'de um profissional habilitado.'
      );
      return;
    }

    setErro(
      'Fichário concluído! Em breve vamos conectar ' +
      'o Gemini para gerar seu treino personalizado.'
    );
  }

  function renderizarPergunta() {
    if (perguntaAtual.tipo === 'numero') {
      return (
        <TextInput
          style={styles.input}
          value={respostas.idade}
          onChangeText={(texto) =>
            atualizarResposta(
              'idade',
              texto.replace(/[^0-9]/g, '')
            )
          }
          keyboardType="number-pad"
          placeholder="Digite sua idade"
          placeholderTextColor="#94A3B8"
          maxLength={3}
        />
      );
    }

    const opcoes = perguntaAtual.opcoes ?? [];

    return (
      <>
        {perguntaAtual.tipo === 'multipla' && (
          <Text style={styles.ajuda}>
            Você pode selecionar mais de uma opção.
          </Text>
        )}

        {opcoes.map((opcao) => {
          const selecionada =
            perguntaAtual.tipo === 'multipla'
              ? respostas.equipamentos.includes(opcao)
              : respostas[perguntaAtual.campo] === opcao;

          return (
            <TouchableOpacity
              key={opcao}
              style={[
                styles.opcao,
                selecionada && styles.opcaoSelecionada,
              ]}
              onPress={() => {
                if (perguntaAtual.tipo === 'multipla') {
                  selecionarEquipamento(opcao);
                } else if (
                  perguntaAtual.campo === 'limitacoes' &&
                  opcao === 'Não'
                ) {
                  setRespostas((anterior) => ({
                    ...anterior,
                    limitacoes: 'Não',
                    descricaoLimitacoes: '',
                  }));
                  setErro('');
                } else {
                  atualizarResposta(
                    perguntaAtual.campo,
                    opcao
                  );
                }
              }}
            >
              <Text style={styles.textoOpcao}>
                {selecionada ? '✓  ' : ''}
                {opcao}
              </Text>
            </TouchableOpacity>
          );
        })}

        {perguntaAtual.tipo === 'limitacoes' &&
          respostas.limitacoes !== '' &&
          respostas.limitacoes !== 'Não' && (
            <>
              <Text style={styles.ajuda}>
                Descreva sua condição ou os movimentos
                que causam desconforto.
              </Text>

              <TextInput
                style={[
                  styles.input,
                  styles.inputMultilinha,
                ]}
                multiline
                value={respostas.descricaoLimitacoes}
                onChangeText={(texto) =>
                  atualizarResposta(
                    'descricaoLimitacoes',
                    texto
                  )
                }
                placeholder="Descreva sua limitação..."
                placeholderTextColor="#94A3B8"
              />

              <Text style={styles.aviso}>
                A IA não substitui uma avaliação
                profissional. Lesões, dores e restrições
                médicas precisam de orientação adequada.
              </Text>
            </>
          )}
      </>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableOpacity onPress={voltar}>
        <Text style={styles.voltar}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.progresso}>
        {revisao
          ? 'Revisão final'
          : `Etapa ${etapa + 1} de ${perguntas.length}`}
      </Text>

      <View style={styles.barra}>
        <View
          style={[
            styles.barraPreenchida,
            {
              width: `${
                revisao
                  ? 100
                  : ((etapa + 1) / perguntas.length) * 100
              }%`,
            },
          ]}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        {revisao ? (
          <>
            <Text style={styles.titulo}>
              Revise suas respostas
            </Text>

            {perguntas.map((pergunta) => {
              const valor = respostas[pergunta.campo];

              return (
                <View
                  key={pergunta.campo}
                  style={styles.resumoItem}
                >
                  <Text style={styles.resumoPergunta}>
                    {pergunta.titulo}
                  </Text>

                  <Text style={styles.resumoResposta}>
                    {Array.isArray(valor)
                      ? valor.join(', ')
                      : valor}
                  </Text>
                </View>
              );
            })}

            {respostas.descricaoLimitacoes !== '' && (
              <View style={styles.resumoItem}>
                <Text style={styles.resumoPergunta}>
                  Descrição da limitação
                </Text>

                <Text style={styles.resumoResposta}>
                  {respostas.descricaoLimitacoes}
                </Text>
              </View>
            )}
          </>
        ) : (
          <>
            <Text style={styles.titulo}>
              {perguntaAtual.titulo}
            </Text>

            {renderizarPergunta()}
          </>
        )}

        {erro !== '' && (
          <Text style={styles.erro}>{erro}</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.botao}
        onPress={revisao ? finalizar : continuar}
      >
        <Text style={styles.textoBotao}>
          {revisao
            ? 'GERAR MEU TREINO →'
            : etapa === perguntas.length - 1
              ? 'REVISAR RESPOSTAS →'
              : 'CONTINUAR →'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101827',
    padding: 24,
    paddingTop: 60,
  },

  voltar: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 25,
  },

  progresso: {
    color: '#50D9A0',
    marginBottom: 12,
  },

  barra: {
    height: 6,
    backgroundColor: '#344256',
    borderRadius: 10,
    marginBottom: 35,
    overflow: 'hidden',
  },

  barraPreenchida: {
    height: '100%',
    backgroundColor: '#50D9A0',
    borderRadius: 10,
  },

  conteudo: {
    paddingBottom: 30,
    flexGrow: 1,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  ajuda: {
    color: '#AAB8CB',
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 21,
  },

  opcao: {
    backgroundColor: '#1B293B',
    padding: 20,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#344256',
  },

  opcaoSelecionada: {
    borderColor: '#50D9A0',
    backgroundColor: '#203F38',
  },

  textoOpcao: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  input: {
    backgroundColor: '#1B293B',
    borderColor: '#344256',
    borderWidth: 1,
    borderRadius: 12,
    padding: 18,
    color: '#FFFFFF',
    fontSize: 16,
  },

  inputMultilinha: {
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 15,
  },

  aviso: {
    color: '#FBBF24',
    fontSize: 13,
    lineHeight: 20,
  },

  erro: {
    color: '#FCA5A5',
    fontSize: 14,
    marginTop: 18,
    lineHeight: 21,
  },

  resumoItem: {
    backgroundColor: '#1B293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  resumoPergunta: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 7,
  },

  resumoResposta: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  botao: {
    backgroundColor: '#50D9A0',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },

  textoBotao: {
    color: '#101827',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
