import React, { useContext } from 'react'
import styled from 'styled-components'
import loadingImage from '../../assets/loading.webp'
import { ContextPeople } from '../../context/Context'

const Overlay = styled.div`
    position: fixed;
    height: 100vh;
    width: 100%;
    top: 0px;
    left: 0px;
    background-color: black;
    opacity: 0.8;
    z-index: 9998;
`

const Container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: auto;
    transform: translate(-50%, -50%);
    height: auto;
    z-index: 9999;
`

const Loading: React.FC = () => {
    const context = useContext(ContextPeople)

    return (
        <>
        {context && context.lazyLoading && (
        <Overlay>
            <Container>
                <img src={loadingImage} alt="Loading" />
            </Container>
        </Overlay>
        )}
        </>
    )
}

export default Loading