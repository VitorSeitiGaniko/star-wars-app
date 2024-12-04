import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import styled from 'styled-components'
import { ContextProvider } from './context/Context'
import ContainerCards from './components/ContainerCards/ContainerCards'
import Filter from './components/Filter/Filter'
import Search from './components/Search/Search'
import Loading from './components/Loading/Loading'
import ModalCard from './components/ModalCard/ModalCard'

const ContainerApp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1170px;

  @media (max-width: 768px) {
    width: 100vw;
  }

  @media (min-width: 768px) and (max-width: 1170px) {
    width: 90vw;
  }
`

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextProvider>
      <ContainerApp>
        <Search />
        <Filter />
        <ContainerCards />
        <ModalCard  />
        <Loading />
      </ContainerApp>
    </ContextProvider>
  </StrictMode>,
)
