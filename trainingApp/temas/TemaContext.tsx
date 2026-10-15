
import React, {
  createContext,
  useContext,
  useState,
} from 'react';

import { temas } from './cores';

type ModoTema = 'escuro' | 'claro';

type TemaContextType = {
  modo: ModoTema;
  cores: typeof temas.escuro;
  alternarTema: () => void;
};

const TemaContext = createContext<
  TemaContextType | undefined
>(undefined);

export function TemaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modo, setModo] = useState<ModoTema>('escuro');

  function alternarTema() {
    setModo((atual) =>
      atual === 'escuro' ? 'claro' : 'escuro'
    );
  }

  return (
    <TemaContext.Provider
      value={{
        modo,
        cores: temas[modo],
        alternarTema,
      }}
    >
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  const contexto = useContext(TemaContext);

  if (!contexto) {
    throw new Error(
      'useTema precisa estar dentro de TemaProvider'
    );
  }

  return contexto;
}
