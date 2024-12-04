import React from 'react'

interface Person {
    name: string;
    homeworld: string;
    starships: string[];
    species: string[];
    height: string;
    mass: string;
    gender: string;
    birth_year: string;
    films: string[];
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

interface ContextPeopleProps {
    peopleArray: Person[];
    setPeopleArray: React.Dispatch<React.SetStateAction<Person[]>>;
    peopleArrayLength: number;
    setPeopleArrayLength: React.Dispatch<React.SetStateAction<number>>;
    peopleFilteredArray: Person[];
    setPeopleFilteredArray: React.Dispatch<React.SetStateAction<Person[]>>;
    planetArray: PlanetType[];
    setPlanetArray: React.Dispatch<React.SetStateAction<PlanetType[]>>;
    starshipArray: StarshipType[];
    setStarshipArray: React.Dispatch<React.SetStateAction<StarshipType[]>>;
    specieArray: SpecieType[];
    setSpecieArray: React.Dispatch<React.SetStateAction<SpecieType[]>>;
    isFilterList: boolean;
    setIsFilterList: React.Dispatch<React.SetStateAction<boolean>>;
    personSelected: any;
    setPersonSelected: React.Dispatch<React.SetStateAction<any>>;
    allowPush: boolean;
    setAllowPush: React.Dispatch<React.SetStateAction<boolean>>;
    remove: boolean;
    setRemove: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    lazyLoading: boolean;
    setLazyLoading: React.Dispatch<React.SetStateAction<boolean>>;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    nextPage: string;
    setNextPage: React.Dispatch<React.SetStateAction<string>>;
    prevPage: string;
    setPrevPage: React.Dispatch<React.SetStateAction<string>>;
    topic_Search: boolean;
    setTopic_Search: React.Dispatch<React.SetStateAction<boolean>>;
    topic_SearchNotFound: boolean;
    setTopic_SearchNotFound: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContextPeople = React.createContext<ContextPeopleProps | undefined>(undefined)

export function ContextProvider({ children }: { children: any }) {
    const [peopleArray, setPeopleArray] = React.useState<Person[]>([])
    const [peopleArrayLength, setPeopleArrayLength] = React.useState<number>(0)
    const [peopleFilteredArray, setPeopleFilteredArray] = React.useState<Person[]>([])
    const [planetArray, setPlanetArray] = React.useState<PlanetType[]>([])
    const [starshipArray, setStarshipArray] = React.useState<StarshipType[]>([])
    const [specieArray, setSpecieArray] = React.useState<SpecieType[]>([])
    const [isFilterList, setIsFilterList] = React.useState<boolean>(false)

    const [personSelected, setPersonSelected] = React.useState<any>('')
    const [allowPush, setAllowPush] = React.useState<boolean>(true)
    const [remove, setRemove] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(true)
    const [lazyLoading, setLazyLoading] = React.useState<boolean>(false)
    const [openModal, setOpenModal] = React.useState<boolean>(false)

    const [nextPage, setNextPage] = React.useState<string>('')
    const [prevPage, setPrevPage] = React.useState<string>('')
    const [topic_Search, setTopic_Search] = React.useState<boolean>(false)
    const [topic_SearchNotFound, setTopic_SearchNotFound] = React.useState<boolean>(false)

    return (
        <ContextPeople.Provider value={{ 
            peopleArray, 
            setPeopleArray, 
            peopleFilteredArray, 
            setPeopleFilteredArray, 
            planetArray, 
            setPlanetArray, 
            starshipArray,
            setStarshipArray,
            specieArray,
            setSpecieArray,
            isFilterList, 
            setIsFilterList,
            remove,
            setRemove,
            loading,
            setLoading,
            openModal,
            setOpenModal,
            personSelected,
            setPersonSelected,
            nextPage,
            setNextPage,
            prevPage,
            setPrevPage,
            allowPush,
            setAllowPush,
            lazyLoading,
            setLazyLoading,
            topic_Search,
            setTopic_Search,
            peopleArrayLength,
            setPeopleArrayLength,
            topic_SearchNotFound,
            setTopic_SearchNotFound
        }}>
            {children}
        </ContextPeople.Provider>
    )
}