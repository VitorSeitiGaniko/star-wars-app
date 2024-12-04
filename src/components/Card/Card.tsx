import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { ContextPeople } from '../../context/Context'  
import loadingImage from '../../assets/loading.webp'
import unknownImage from '../../assets/unknown.png'

interface Person {
    name: string;
    height: string;
    mass: string;
    gender: string;
    birth_year: string;
    homeworld: string;
    films: string[];
    starships: string[];
    species: string[];
}

interface PlanetType {
    name: string;
    url: string;
    climate: string;
    population: string;
    terrain: string;
}

interface StarshipType {
    name: string;
    url: string;
}

interface SpecieType {
    name: string;
    url: string;
}

interface CardProps {
    person: Person;
    filter?: boolean;
}


const CardBox = styled.div`
    border: none;
    border-radius: 8px;
    cursor: pointer;

    width: 330px;
    height: 270px;
    padding: 22px;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }

    @media (max-width: 375px) {
        width: 120px;
        height: 170px;
    }

    @media (min-width: 376px) and (max-width: 768px) {
        width: 140px;
        height: 170px;
    }
`

const CardImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 6px;

    @media (max-width: 768px) {
        height: 90px;
    }
`

const Title = styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: var(--white);

    @media (max-width: 768px) {
        font-size: 20px;
    }
`

const ImageLoading = styled.img`
    border: none;
    border-radius: 8px;

    width: 330px;
    height: 270px;
    opacity: 0.5;

    @media (max-width: 768px) {
        width: 140px;
        height: 170px;
    }
`

const Card: React.FC<CardProps> = ({ person, filter }) => {
    const URL_IMAGE = 'https://starwars-databank-server.vercel.app/api/v1/characters/name/'
    const context = useContext(ContextPeople)

    const [planetInfos, setPlanetInfos] = useState<PlanetType | null>(null)
    const [starshipInfos, setStarshipInfos] = useState<StarshipType[]>([])
    const [specieInfos, setSpecieInfos] = useState<SpecieType[]>([])
    const [image, setImage] = useState<string>('')

    function getPlanetInfos(url: string): Promise<PlanetType> {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => {
                    if (response.ok && response.status === 200) {
                        return response.json();
                    } else {
                        reject(new Error('Failed to fetch data'));
                    }
                })
                .then(data => {
                    setPlanetInfos(data);                    

                    if (!filter && context && context.allowPush) {
                        context.setPlanetArray((prevArray: PlanetType[]) => [...prevArray, data]);
                    }
                    resolve(data);
                })
                .catch(error => {
                    console.error('erros: ', error);
                    reject(error);
                });
        });
    }

    function getPersonStarship(url: string): Promise<StarshipType> {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => {
                    if (response.ok && response.status === 200) {
                        return response.json();
                    } else {
                        reject(new Error('Failed to fetch data'));
                    }
                })
                .then(data => {
                    setStarshipInfos((prevArray: StarshipType[]) => [...prevArray, data]);
                    if (!filter && context && context.allowPush) {
                        context.setStarshipArray((prevArray: StarshipType[]) => [...prevArray, data]);
                    }
                    resolve(data);
                })
                .catch(error => {
                    console.error('erros: ', error);
                    reject(error);
                });
        });
    }

    function getPersonSpecie(url: string): Promise<SpecieType> {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => {
                    if (response.ok && response.status === 200) {
                        return response.json();
                    } else {
                        reject(new Error('Failed to fetch data'));
                    }
                })
                .then(data => {
                    setSpecieInfos((prevArray: SpecieType[]) => [...prevArray, data]);
                    if (!filter && context && context.allowPush) {
                        context.setSpecieArray((prevArray: SpecieType[]) => [...prevArray, data]);
                    }
                    resolve(data);
                })
                .catch(error => {
                    console.error('erros: ', error);
                    reject(error);
                });
        });
    }

    function getPersonImage(name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            fetch(`${URL_IMAGE}${name}`)
                .then(response => {
                    if (response.ok && response.status === 200) {
                        return response.json();
                    } else {
                        reject(new Error('Failed to fetch data'));
                    }
                })
                .then(data => {
                    if (data && data.length > 0) setImage(data[0].image);
                    resolve(data);
                })
                .catch(error => {
                    console.error('erros: ', error);
                    reject(error);
                });
        });
    }

    function openModal() {
        context?.setOpenModal(true)
        context?.setPersonSelected(
            {
                person,
                planetInfos,
                starshipInfos,
                specieInfos,
                image
            }
        )
    }

    useEffect(() => {
        const promises: Promise<any>[] = [];
        context?.setLoading(true)

        promises.push(getPlanetInfos(person.homeworld));

        promises.push(getPersonImage(person.name));

        if (person.starships && person.starships.length > 0) {
            person.starships.forEach((starship) => {
                promises.push(getPersonStarship(starship));
            });
        }

        if (person.species && person.species.length > 0) {
            person.species.forEach((specie) => {
                promises.push(getPersonSpecie(specie));
            });
        }

        Promise.all(promises)
            .then(() => {
                context?.setLoading(false)
            })
            .catch(error => {
                console.error('One or more promises failed', error);
            });
    }, [person])

    return (
        <>
            {context?.loading && (
                <ImageLoading src={loadingImage} alt="" />
            )}

            {!context?.loading && (
                <CardBox onClick={openModal}>
                    <CardImage src={image || unknownImage} alt={person.name} />
                    <Title>{person.name}</Title>
                </CardBox>
            )}
        </>
    )
}

export default Card