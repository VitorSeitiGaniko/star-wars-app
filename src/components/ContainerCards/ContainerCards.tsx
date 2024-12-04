import React, { useContext, useEffect } from 'react'
import Card from '../Card/Card'
import styled from 'styled-components'
import { ContextPeople } from '../../context/Context'

const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-top: 52px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
    }

    @media (min-width: 768px) and (max-width: 1170px) {
        grid-template-columns: repeat(2, 1fr);
    }
`

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 36px;

    > button{
        border: none;
        border-radius: 20px;
        padding: 10px 20px;
        cursor: pointer;
    }
`

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

const ContainerCards: React.FC = () => {
    const URL_PERSON = 'https://swapi.dev/api/people'
    const context = useContext(ContextPeople)

    async function getPeople(url: string) {
        context?.setLoading(true)

        context?.setNextPage('')
        context?.setPrevPage('')

        try {
            const response = await fetch(url)
            if (response.ok && response.status === 200) {
                const data = await response.json()

                context?.setPeopleArray([])
                context?.setPlanetArray([])
                context?.setStarshipArray([])
                context?.setSpecieArray([])
                context?.setPeopleArray(data.results)
                context?.setPeopleArrayLength(data.results.length)
                context?.setRemove(true)

                if (data.previous) context?.setPrevPage(data.previous)
                if (data.next) context?.setNextPage(data.next)
            }
        } catch (error) {
            console.error('erros: ', error)
        }
    }

    function handlePrevPage() {
        if(context && context.prevPage){
            context?.setPeopleArray([])
            context?.setPlanetArray([])
            context?.setStarshipArray([])
            context?.setSpecieArray([])
            getPeople(context.prevPage)
            context?.setAllowPush(true)
        }
    }

    function handleNextPage() {
        if(context && context.nextPage){
            context?.setPeopleArray([])
            context?.setPlanetArray([])
            context?.setStarshipArray([])
            context?.setSpecieArray([])
            getPeople(context.nextPage)
            context?.setAllowPush(true)
        }
    }

    useEffect(() => {
        getPeople(URL_PERSON)
    }, [])

    return (
        <>        
            <CardContainer>
                {!context?.isFilterList && context?.peopleArray.map((person: Person, index: number) => (
                    <Card key={person.name + index} person={person} filter={false} />
                ))}

                {context?.isFilterList && context.peopleFilteredArray.map((person: Person, index: number) => (
                    <Card key={person.name + index} person={person} filter={true} />
                ))}
            </CardContainer>

            {context && context.topic_SearchNotFound && <h1>Character not found</h1>}
            
            <ButtonsContainer>
                {context && !context.loading && !context.isFilterList && context.prevPage && <button onClick={handlePrevPage}>Prev page</button>}

                {context && !context.loading && !context.isFilterList && context.nextPage && <button onClick={handleNextPage}>Next page</button>}
            </ButtonsContainer>
        </>    
    )
}

export default ContainerCards