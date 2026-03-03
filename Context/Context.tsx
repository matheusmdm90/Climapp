import { createContext } from "react";

// desidi cria um contexto global para praticar o uso do contexto no React, onde podemos armazenar e compartilhar dados que são necessários em várias partes do aplicativo, como a lista de estados brasileiros, evitando a necessidade de passar esses dados como props por vários níveis de componentes.
interface appProvidets {
  children: React.ReactNode;
}

export const appContext = createContext({});

export const AppProvide = ({ children }: appProvidets) => {
  const estadosBrasileiros = [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins",
  ];

  return (
    <appContext.Provider
      value={{
        estadosBrasileiros,
      }}
    >
      {children}
    </appContext.Provider>
  );
};
