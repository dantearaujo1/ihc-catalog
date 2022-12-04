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
        <Stack  mb={4} width="80%" spacing={4} alignItems="center" sx={{ alignItems: "center", marginTop: 8 }}>
          <Typography variant="h1"> Como usar nossa aplicação </Typography>
          <Stack spacing={2}>
            <Typography variant="h3" color='secondary'> Olá meu queride...</Typography>
            <Typography variant="h3"> Aqui ajudaremos você na sua busca por um instrumento de avaliação de experiência do usuário para seus projetos </Typography>
          </Stack>
          <Stack direction="row" spacing={4} alignItems="center" justifyContent="space-between">
            <Image fit='scale-down' width="50%" src='../../header-teal.png'></Image>
            <Stack spacing={4} width="50%">
              <Typography variant="h3">Ao entrar em nossa aplicação você usuário irá se deparar com a primeira tela de nossa aplicação que é a tela inicial, nessa tela você terá a possibilidade de pesquisar os instrumentos de avaliação de 3 formas distintas. A principal forma de pesquisa é a filtragem por categorias, que fica no centro da tela, como mostrado na imagem, nela você usuário poderá selecionar varias subcategorias dentro de uma das 5 principais categorias e realizar uma pesquisa personalizada de acordo com sua demanda; Outra forma de pesquisa é a que se encontra no topo da nossa aplicação que permite a você usuário pesquisar por palavra-chave o instrumento que deseja utilizar, de maneira mais rápida, quando já tem o conhecimento do nome do instrumento. E a outra possibilidade de pesquisa e por categoria sem filtragem em um sub menu topicalizado onde será listado todos os instrumentos da categoria escolhida.</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={4} alignItems="center" justifyContent="space-between">
            <Stack width="50%">
              <Typography variant="h3">

                Após pesquisar pelo método de filtragem por categoria você usuário irá ser levado a outra página com os resultados dos instrumentos existentes de acordo com as categorias selecionadas, nessa página você poderá ver algumas características dos instrumentos listados que poderá ser expandida ao clicar em cima do determinado instrumento.
                Se após selecionar as características de sua demanda o usuário não encontra resultados o mesmo será redirecionado a uma página de vazio , para que o mesmo altere as características de pesquisa.
              </Typography>
            </Stack>
            <Image fit='scale-down' width="50%" src='../../header-teal.png'></Image>
          </Stack>
          <Stack direction="row" spacing={4} alignItems="center" justifyContent="space-between">
            <Image fit='scale-down' width="50%" src='../../header-teal.png'></Image>
            <Stack spacing={4} width="50%">
              <Typography variant="h3">
                <Typography variant='h4'>
                  Pesquisa por palavra chave
                </Typography>
                Após a pesquisa pelo método palavra-chave o usuário será também levado a outra página com os resultados de sua pesquisa e terá as mesmas opções da pesquisa por filtragem.
              </Typography>
              <Typography variant="h3">
                <Typography variant='h4'>
                  Pesquisa por categorias
                </Typography>
                Após a pesquisa por categoria sem filtragem, será mostrada ao usuário uma lista de todos os instrumentos da categoria escolhida, onde o usuário poderá ter as mesmas possibilidades de ação das opções anteriores.
              </Typography>
              <Typography variant="h3">
                <Typography variant='h4'>
                Menu de filtragem lateral
                </Typography>
                Na página de resultados independente do método de pesquisa utilizado será mostrado ao usuário um menu lateral de filtragem rápida para que o usuário possa fazer outra pesquisa sem precisar retornar a página inicial.
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={4} alignItems="center" justifyContent="space-between">
            <Stack spacing={4} width="50%">
              <Typography variant="h3">
                <Typography variant='h4'>
                Sugestões de outros instrumentos na página de resultados
                </Typography>
                Na página de resultados o usuário terá a sua disposição sugestões de outros instrumentos semelhantes aos da pesquisa.
              </Typography>
              <Typography variant="h3">
                <Typography variant='h4'>
                Sugestão de novos instrumentos
                </Typography>
                Durante a utilização da aplicação em todas as páginas os usuário poderão sugerir outros instrumentos de seu conhecimento para serem ou não adicionados a aplicação.
              </Typography>
            </Stack>
            <Image fit='scale-down' width="50%" src='../../header-teal.png'></Image>
          </Stack>
          <Typography variant='h3'>
            Essas são as principais formas de navegação da aplicação e você usuário utilizando essas dicas conseguirá sem muitas dificuldades navegar e encontrar os instrumentos necessários para resolver a sua demanda.
          </Typography>
        </Stack>
      </Stack>
      <Stack height="100%">
        <IHCFooter></IHCFooter>
      </Stack>
    </Stack>

  );
}

export default Tutorial;
