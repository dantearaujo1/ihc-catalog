import React from "react";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { IHCButtonRounded } from "../assets/ComponentStyle"

import NavigationHeader from "../components/Navigation/NavigationHeader";
import NavigationBar from "../components/Navigation/NavigationBar"
import IHCFooter from "../components/Navigation/Footer"
import Image from "mui-image"



import { useState, useEffect } from "react";


function Tutorial() {
  const navigate = useNavigate();
  const [cat, setCat] = useState();
  const [sub, setSub] = useState();

  const getCategories = async () => {
    const categories = await fetch('/api/v1/article/cat/all');
    const toJson = await categories.json();
    const ordered = toJson.sort((a, b) => {
      return (b.name < a.name ? 1 : b.name > a.name ? -1 : 0);
    })

    setCat(ordered);
  }

  const getSubcategories = async () => {
    const subcategories = await fetch('/api/v1/article/sub/all');
    const toJson = await subcategories.json();
    const ordered = toJson.sort((a, b) => {
      return (b.name < a.name ? 1 : b.name > a.name ? -1 : 0);
    })
    setSub(ordered);
  }

  useEffect(() => {
    const fetch_data = async () => {
      await getCategories();
      await getSubcategories();

    };
    fetch_data().catch(console.error);
  }, []);


  return (
    <Stack style={{ height: "100vh" }}>
      <NavigationHeader />
      <NavigationBar categories={cat} subcategories={sub} />
      <Stack alignItems='center'>
        <Stack mb={4} width="80%" spacing={4} alignItems="center" sx={{ alignItems: "center", marginTop: 8 }}>
          <Typography variant="h1"> Como usar nossa aplicação </Typography>
          <Stack width="100%"  spacing={2}>
            <Typography variant="h3" color='secondary'> Olá, querides...</Typography>
            <Typography variant="h3"> Aqui ajudaremos você na sua busca por um instrumento de avaliação de experiência do usuário para seus projetos.</Typography>
          </Stack>
          <Stack direction="row" spacing={4} alignItems="center" justifyContent="space-between">
            <Image fit='scale-down' width="50%"  src='../../helper-1.png'></Image>
            <Stack spacing={4} width="50%">
              <Typography variant='h4'>
                Primeiros Passos
              </Typography>
              <Typography variant="subtitle1">
                Ao entrar no Catálogo de IHC, você irá se deparar com a tela inicial, que contém as principais informações da aplicação. Nessa tela você terá a possibilidade de pesquisar os instrumentos de avaliação de 3 formas distintas. A principal forma de pesquisa é a filtragem por categorias, que fica no centro da tela (1). Nela você poderá combinar varias subcategorias dentre as 6 principais categorias e realizar uma pesquisa personalizada de acordo com sua demanda. Outra forma de pesquisa é a que se encontra no topo da aplicação (2) que permite a você pesquisar por palavra-chave o instrumento que deseja utilizar, de maneira mais rápida, quando já tem o conhecimento do nome do instrumento. Por último, você também poderá navergar pela barra de menu (3) na parte superior da aplicação, onde serão listados todos os instrumentos separados por categoria.</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={4} alignItems="center" justifyContent="space-between">
            <Stack width="50%">
              <Typography variant='h4'>
                Encontrando seus Instrumentos
              </Typography>'
              <Typography variant="subtitle1">
                Após a sua pesquisa, independentemente do método utilizado, disponibilizaremos uma lista de todos os instrumentos da categoria escolhida (4). Na página de resultados, serão mostrados os instrumentos encontrados com alguns detalhes de cada um deles (5). Nessa etapa, você pode escolher conhecer mais sobre o instrumento de sua escolha ou reajustar os filtros da sua busca para encontrar novos instrumentos.
              </Typography>
            </Stack>
            <Image fit='scale-down' width="50%" src='../../helper-2.png'></Image>
          </Stack>
          <Stack direction="row" spacing={4} alignItems="center" justifyContent="space-between">
            <Image fit='scale-down' width="50%" src='../../helper-3.png'></Image>
            <Stack spacing={4} width="50%">
              <Typography variant='h4'>
                Menu de filtragem lateral
              </Typography>
              <Typography variant="subtitle1">
                Ao receber seus resultados, você poderá reajustar sua pesquisa a qualquer momento. Para isso, você poderá usar o menu lateral de filtragem rápida (6). Dessa forma, você terá a possibilidade de fazer outra pesquisa sem precisar retornar a página inicial.
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={4} alignItems="center" justifyContent="space-between">
            <Stack spacing={4} width="50%">
              <Typography variant='h4'>
                Sugestões de Instrumentos
              </Typography>
              <Typography variant="subtitle1">
                Apersar de tentarmos disponibilizar a maior quantidade de instrumentos possível, existe a chance de você conhecer algum que não encontrou na nossa aplicação. Dessa forma, você poderá fazer a sua sugestão (7) e nós adicionaremos ao catálgo assim que possível.
              </Typography>

            </Stack>
            <Image fit='scale-down' width="50%" src='../../helper-4.png'></Image>
          </Stack>
          <Stack pt={10} pb={5}>
            <Typography  variant='h3'>
              Essas são as principais formas de navegação da aplicação e você usuário utilizando essas dicas conseguirá sem muitas dificuldades navegar e encontrar os instrumentos necessários para resolver a sua demanda.
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack height="100%">
        <IHCFooter></IHCFooter>
      </Stack>
    </Stack>

  );
}

export default Tutorial;

