import React, {useState} from "react";
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"

import NavigationHeader from "../components/Navigation/NavigationHeader"
import NavigationBar from "../components/Navigation/NavigationBar"
import ArticleCard from "../components/ArticleCard"

const ResultList = () => {
  const [page, setPage] = useState(5);
  return (
    <Stack>
      <NavigationHeader></NavigationHeader>
      <NavigationBar></NavigationBar>
      <Stack sx={{mt:3}} justifyContent="center" alignItems="center">
        <ArticleCard></ArticleCard>
        <ArticleCard></ArticleCard>
        <Pagination sx={{mt:4}}  count={page}></Pagination>
      </Stack>
    </Stack>
  )
}

export default ResultList;
