import React from 'react'
import styled from 'styled-components'
import { ContextPeople } from '../../context/Context'
import unknownImage from '../../assets/unknown.png'

const Overlay = styled.div`
    position: fixed;
    height: 100vh;
    width: 100%;
    top: 0px;
    left: 0px;
    background-color: black;
    opacity: 0.3;
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

const Modal = styled.div`
    background: #fff;
    border-radius: 8px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80vh;
    width: 520px;
    padding: 32px;
    padding-top: 44px;
    color: var(--black);
    overflow-y: auto;
    position: relative;

    @media (max-width: 768px) {
        width: 280px;
    }
`

const Image = styled.img`
    width: 100%;
    height: 330px;
    object-fit: cover;
    border-radius: 6px;
`

const Title = styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: var(--black);
    text-align: center;
    margin: 16px 0;
`

const Subtitle = styled.h3`
    font-size: 20px;
    font-weight: 700;
    color: var(--black);
    text-align: center;
    margin: 0;
    margin-top: 24px;
`

const Paragraph = styled.p`
    font-size: 16px;
    font-weight: 400;
    color: var(--black);
    text-align: center;
    margin: 0;
    margin-top: 12px;

    > span{
        margin-left: 8px;

        &:first-of-type{
            font-weight: 700;
        }
    }
`

const IconClose = styled.span`
    background-image: url("data:image/svg+xml,%3Csvg fill='%23000000' height='24px' width='24px' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 512 512' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpolygon points='512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 512,452.922 315.076,256 '/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    width: 24px;
    height: 24px;
    position: absolute;
    right: 20px;
    top: 14px;
    cursor: pointer;
`

interface StarshipType {
    name: string;
    url: string;
}

interface SpecieType {
    name: string;
    url: string;
}

function ModalCard() {
    const context = React.useContext(ContextPeople)

    function formatHeight(heightInCm: number): string {
        const heightInMeters = heightInCm / 100;
        return `${heightInMeters}m`;
    }

    return (
        <>
            {context && context.openModal && (
            <>
            <Overlay onClick={() => context.setOpenModal(false)}>
            </Overlay>
            <Container>
                <Modal>
                    <IconClose onClick={() => context.setOpenModal(false)} />
                    <Image src={context.personSelected.image || unknownImage} alt={context.personSelected.person.name} />
                    <Title>{context.personSelected.person.name}</Title>
                    <Paragraph>
                        <span>Height:</span>
                        <span>{formatHeight(context.personSelected.person.height)}</span>
                    </Paragraph>
                    <Paragraph>
                        <span>Mass:</span>
                        <span>{context.personSelected.person.mass}kg</span>
                    </Paragraph>
                    <Paragraph>
                        <span>Gender:</span>
                        <span>{context.personSelected.person.gender}</span>
                    </Paragraph>
                    <Paragraph>
                        <span>Birth year:</span>
                        <span>{context.personSelected.person.birth_year}</span>
                    </Paragraph>
                    <Paragraph>
                        <span>Number of films:</span>
                        <span>{context.personSelected.person.films.length}</span>
                    </Paragraph>

                    {context.personSelected.planetInfos && (
                        <Subtitle>Planet</Subtitle>
                    )}
                    {context.personSelected.planetInfos && (
                        <Paragraph>
                            <span>Name:</span>
                            <span>{context.personSelected.planetInfos.name}</span>
                        </Paragraph>
                    )}
                    {context.personSelected.planetInfos && (
                        <Paragraph>
                            <span>Terrain:</span>
                            <span>{context.personSelected.planetInfos.terrain}</span>
                        </Paragraph>
                    )}
                    {context.personSelected.planetInfos && (
                        <Paragraph>
                            <span>Climate:</span>
                            <span>{context.personSelected.planetInfos.climate}</span>
                        </Paragraph>
                    )}
                    {context.personSelected.planetInfos && (
                        <Paragraph>
                            <span>Population:</span>
                            <span>{context.personSelected.planetInfos.population}</span>
                        </Paragraph>                
                    )}

                    {context.personSelected.starshipInfos && context.personSelected.starshipInfos.length > 0 &&
                        <Subtitle>Starships</Subtitle>
                    }
                    {context.personSelected.starshipInfos && context.personSelected.starshipInfos.length > 0 && context.personSelected.starshipInfos.map((starship: StarshipType, index: number) => (
                        <Paragraph key={starship.name + index}>
                            <span>{starship.name}</span>
                        </Paragraph>
                    ))}

                    {context.personSelected.specieInfos && context.personSelected.specieInfos.length > 0 &&
                        <Subtitle>Species</Subtitle>
                    }
                    {context.personSelected.specieInfos && context.personSelected.specieInfos.length > 0 && context.personSelected.specieInfos.map((specie: SpecieType, index: number) => (
                        <Paragraph key={specie.name + index}>
                            <span>{specie.name}</span> 
                        </Paragraph>
                    ))}
                </Modal>
            </Container>
            </>
            )}
        </>
)}

export default ModalCard