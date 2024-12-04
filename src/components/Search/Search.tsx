import React from 'react'
import { ContextPeople } from '../../context/Context'
import styled from 'styled-components'

const Container = styled.div`
    width: 90%;
`  	

const SearchContainer = styled.div`
    position: relative;
`

const Icon = styled.span`
    background-image: url("data:image/svg+xml,%3Csvg version='1.0' xmlns='http://www.w3.org/2000/svg' width='36px' height='36px' viewBox='0 0 1244.000000 1280.000000' preserveAspectRatio='xMidYMid meet'%3E%3Cmetadata%3E%0ACreated by potrace 1.15, written by Peter Selinger 2001-2017%0A%3C/metadata%3E%3Cg transform='translate(0.000000,1280.000000) scale(0.100000,-0.100000)'%0Afill='%23000000' stroke='none'%3E%3Cpath d='M4025 12789 c-1029 -79 -1969 -501 -2704 -1214 -985 -955 -1456%0A-2292 -1285 -3650 156 -1244 849 -2360 1899 -3059 193 -129 272 -175 470 -274%0A452 -227 906 -362 1445 -429 207 -25 763 -25 970 0 404 50 752 138 1115 281%0A251 98 600 283 819 433 l80 54 1075 -1073 c3835 -3827 3770 -3762 3828 -3795%0A189 -105 411 -75 563 77 148 148 180 359 84 553 -21 43 -462 488 -2432 2459%0A-2212 2213 -2404 2408 -2392 2425 8 10 40 47 70 83 714 836 1088 1927 1031%0A3011 -32 610 -165 1136 -420 1664 -169 349 -340 615 -592 920 -106 128 -395%0A417 -524 524 -687 569 -1463 900 -2336 996 -174 19 -598 27 -764 14z m780%0A-949 c777 -118 1453 -463 1982 -1014 516 -536 829 -1194 930 -1951 24 -186 24%0A-618 0 -810 -54 -416 -158 -758 -342 -1125 -297 -593 -779 -1101 -1360 -1432%0A-964 -549 -2153 -590 -3152 -108 -975 470 -1667 1364 -1873 2420 -37 192 -51%0A323 -57 555 -6 258 4 423 42 651 161 971 742 1831 1588 2348 453 278 935 434%0A1512 490 22 2 164 3 315 1 217 -3 304 -8 415 -25z'/%3E%3C/g%3E%3C/svg%3E");
    width: 36px;
    height: 36px;
    position: absolute;
    right: 0;
    top: 5px;
    cursor: pointer;
`

const Input = styled.input`
    width: 100%;
    padding: 16px 0 16px 16px;
    border: none;
    border-radius: 20px;

    font-size: 16px;

    @media (max-width: 768px) {
        width: 98%;
    }
`

function Search() {
    const context = React.useContext(ContextPeople)
    const URL_SEARCH = 'https://swapi.dev/api/people/?search='

    const [inputSearch, setInputSearch] = React.useState<string>('')

    // eslint-disable-next-line
    async function handleSubmit(event: any){
        event.preventDefault()
        context?.setIsFilterList(false)
        context?.setNextPage('')
        context?.setPrevPage('')
        context?.setLazyLoading(true)

        try{
            const response = await fetch(`${URL_SEARCH}${inputSearch}`)
            if(response.ok && response.status === 200){
                context?.setTopic_SearchNotFound(false)
                const data = await response.json()
                console.log('DATA SEARCH  ==> ', data);

                context?.setPlanetArray([])
                context?.setStarshipArray([])
                context?.setSpecieArray([])
                context?.setRemove(true)
                context?.setPeopleArray(data.results)
                context?.setPeopleArrayLength(data.results.length)
                context?.setAllowPush(true)

                if(data.previous) context?.setPrevPage(data.previous)
                if(data.next) context?.setNextPage(data.next)
                context?.setLazyLoading(false)
                context?.setTopic_Search(!context?.setTopic_Search)

                if(data.results.length === 0){
                    context?.setTopic_SearchNotFound(true)
                }
            }
        }

        catch(error){   
            console.error('erros: ', error)
        }
    }

    return (
        <>
        {context && !context.loading && (
        <Container>
            <form onSubmit={handleSubmit}>
                <SearchContainer>
                    <Input type="text" 
                    placeholder="Personagem"
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}/>
                    <Icon onClick={handleSubmit}/>
                </SearchContainer>
            </form>
        </Container>
        )}
        </>
    )
}

export default Search