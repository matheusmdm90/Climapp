import { createContext, useState } from "react";

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

  const [estadoAtual, setEstadoAtual] = useState("");

  return (
    <appContext.Provider
      value={{
        estadosBrasileiros,
        estadoAtual,
        setEstadoAtual,
      }}
    >
      {children}
    </appContext.Provider>
  );
};
