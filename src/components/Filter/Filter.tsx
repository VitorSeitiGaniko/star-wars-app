import React, { useContext, useState, useEffect } from 'react'
import { ContextPeople } from '../../context/Context'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
`  	 

const Form = styled.form`
    display: flex;
    justify-content: space-between;
    margin-top: 32px;

    @media (max-width: 768px) {
        flex-direction: column;
        justify-content: center;
        gap: 16px;
    }

    @media (min-width: 768px) and (max-width: 1170px) {
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px;
    }
`

const SelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Label = styled.label`
    font-size: 16px;
    font-weight: 700;
    text-align: center;
`

const Select = styled.select`
    border: none;
    border-radius: 8px;
    padding: 4px 28px;
    margin-top: 4px;
`

const Button = styled.button`
    border: none;
    border-radius: 20px;
    padding: 0 80px;
    font-size: 16px;
    font-weight: 700;
    height: 42px;
    cursor: pointer;

    @media (max-width: 768px) {
        width: 30%;
        margin: auto;
        padding: 0;
    }

    @media (min-width: 768px) and (max-width: 1170px) {
        margin-top: 16px;
    }
`

const ButtonClear = styled(Button)`
    display: flex;
    margin: auto;
    margin-top: 32px;
    padding: 12px 50px;
    cursor: pointer;

    @media (max-width: 768px) {
        width: 129px;
        height: auto;
        padding: 11px;
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

const Filter: React.FC = () => {
    const context = useContext(ContextPeople)

    const [selectedPlanet, setSelectedPlanet] = useState<string>('')
    const [selectedStarship, setSelectedStarship] = useState<string>('')
    const [selectedSpecie, setSelectedSpecie] = useState<string>('')

    const [uniquePlanetsArray, setUniquePlanets] = useState<PlanetType[]>([])
    const [uniqueStarshipsArray, setUniqueStarships] = useState<StarshipType[]>([])
    const [uniqueSpeciesArray, setUniqueSpecies] = useState<SpecieType[]>([])

    function removeDuplicates() {
        if (context) {
            context.setLoading(true)
            context.setLazyLoading(true)
        }

        if(context?.planetArray.length === 0 ) return
        const uniquePlanets: PlanetType[] = []
        const namePlanets = new Set<string>()

        const uniqueStarships: StarshipType[] = []
        const nameStarships = new Set<string>()

        const uniqueSpecies: SpecieType[] = []
        const nameSpecies = new Set<string>()

        if (context) {
            context.planetArray.forEach((planet: PlanetType) => {
                if (!namePlanets.has(planet.name)) {
                    namePlanets.add(planet.name)
                    uniquePlanets.push(planet)
                }
            })

            context.starshipArray.forEach((starship: StarshipType) => {
                if (!nameStarships.has(starship.name)) {
                    nameStarships.add(starship.name)
                    uniqueStarships.push(starship)
                }
            })

            context.specieArray.forEach((specie: SpecieType) => {
                if (!nameSpecies.has(specie.name)) {
                    nameSpecies.add(specie.name)
                    uniqueSpecies.push(specie)
                }
            })

            setUniquePlanets(uniquePlanets)
            setUniqueStarships(uniqueStarships)
            setUniqueSpecies(uniqueSpecies)

            context.setLoading(false)
            context.setLazyLoading(false)
            context.setTopic_Search(!context.setTopic_Search)

            context.setAllowPush(false)
        }
    }

    function applyCombinedFilter(event: React.FormEvent) {
        event.preventDefault()
        if (context) {
            context.setIsFilterList(true);

            const arrayFiltered = context.peopleArray.filter((person: Person) => {
                const matchesPlanet = selectedPlanet ? person.homeworld === selectedPlanet : true;
                const matchesStarship = selectedStarship ? person.starships && person.starships.length > 0 && person.starships.some((starship: string) => starship === selectedStarship) : true;
                const matchesSpecie = selectedSpecie ? person.species && person.species.length > 0 && person.species.some((specie: string) => specie === selectedSpecie) : true;
                return matchesPlanet && matchesStarship && matchesSpecie;
            });

            context.setPeopleFilteredArray(arrayFiltered);
        }
    }

    function cleanFilter() {
        if (context) {
            context.setIsFilterList(false)
            context.setRemove(false)
        }
        setSelectedPlanet('')
        setSelectedStarship('')
        setSelectedSpecie('')
    }

    // eslint-disable-next-line
    function hasNoDuplicates(array: any[]) {
        const seen = new Set();
        for (const item of array) {
            if (seen.has(item)) {
                return false;
            }
            seen.add(item);
        }
        return true;
    }

    useEffect(() => {        
        if(
            context
            && context.planetArray.length > 0 
            && context.planetArray.length === context.peopleArray.length
            && context.remove
        ) {            
            removeDuplicates()
        }
    }, [context?.planetArray, context?.isFilterList])

    useEffect(() => {
        if(
            context
            && context.planetArray.length === context.peopleArrayLength &&
            (
                hasNoDuplicates(context.planetArray)
                ||  hasNoDuplicates(context.starshipArray)
                ||  hasNoDuplicates(context.specieArray)
            )            
        ) {
            context.setLazyLoading(true)
            removeDuplicates()
        } else{
            context?.setLazyLoading(false)
        }
    }, [context?.topic_Search])

    return (
        <>
            {context && !context.loading && (
            <Container>
                <Form>
                    <SelectContainer>
                        <Label>Planet</Label>
                        <Select value={selectedPlanet} onChange={(e) => setSelectedPlanet(e.target.value)}>
                            <option defaultValue="Choose a planet">
                                Choose a planet
                            </option>
                            {uniquePlanetsArray && uniquePlanetsArray.length > 0 && uniquePlanetsArray.map((planet: PlanetType, index: number) => (
                            <option key={planet.name + index} value={planet.url}>{planet.name}</option>
                            ))}
                        </Select>
                    </SelectContainer>
                    
                    <SelectContainer>
                        <Label>Starship</Label>
                        <Select value={selectedStarship} onChange={(e) => setSelectedStarship(e.target.value)}>
                            <option defaultValue="Choose a starship">
                                Choose a starship
                            </option>
                            {uniqueStarshipsArray && uniqueStarshipsArray.length > 0 && uniqueStarshipsArray.map((starship: StarshipType, index: number) => (
                            <option key={starship.name + index} value={starship.url}>{starship.name}</option>
                            ))}
                        </Select>
                    </SelectContainer>

                    <SelectContainer>
                        <Label>Specie</Label>
                        <Select value={selectedSpecie} onChange={(e) => setSelectedSpecie(e.target.value)}>
                            <option defaultValue="Choose a specie">
                                Choose a specie
                            </option>
                            {uniqueSpeciesArray && uniqueSpeciesArray.length > 0 && uniqueSpeciesArray.map((specie: SpecieType, index: number) => (
                            <option key={specie.name + index} value={specie.url}>{specie.name}</option>
                            ))}
                        </Select>
                    </SelectContainer>
                    <Button onClick={applyCombinedFilter}>Filter</Button>
                </Form>
                <ButtonClear onClick={cleanFilter}>Clear Filters</ButtonClear>
            </Container>
            )}
        </>
    )
}

export default Filter