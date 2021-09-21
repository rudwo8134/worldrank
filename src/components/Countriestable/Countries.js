import React,{useState} from 'react'
import style from '../../../staticstyle'
import styled,{css} from 'styled-components'
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@material-ui/icons'
import Link from 'next/link'

const Samebutton = css`
  flex:1;
  padding:20px;
  color: ${style.textSecondary};
  font-weight: 500;
  display:flex ;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  
`

const Heading = styled.div`
  display: flex;
  flex-direction: row;
  button {
    border: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
  }
`;
const HeadingName = styled.button`
  ${Samebutton}
  justify-content: flex-start;
`;
const HeadingPopulation = styled.button`
  ${Samebutton}
`;

const Rowcontainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  text-align: center;
  background-color: ${style.Backgroundcolorlight};
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: ${style.boxShadow};
  font-weight: 500;
  transition: all 200ms ease-in-out;
  .name{
    flex:1;
    text-align: left;
  }
  .population{
    flex:1;
  }
  :hover{
    transform:  translateY(-4px);
    box-shadow: 0px 4px 16px rgba(0,0,0,0.1);
  }
`;

const Stylearrow = styled.div`
  color: ${style.primaryColor};
  display: flex ;
  justify-content: center ;
  align-items: center ;
  margin-left: 2px ;

`


const orderby = (countries, values, direction) =>{
  if(direction == "asc"){
    return [...countries].sort((a, b) => (a[values] > b[values] ? 1 : -1)); 
  }

  if(direction === "desc"){
    return [...countries].sort((a, b) => (a[values] > b[values] ? -1 : 1)); 
  }

  return countries
  
}

const SortArrow = ({direction}) =>{
  if(!direction){
    return null;
  }

  if (direction === 'desc') {
    return (
      <Stylearrow>
        <KeyboardArrowDownRounded color="inherit" />
      </Stylearrow>
    );
  } else {
    return (
      <Stylearrow>
        <KeyboardArrowUpRounded color="inherit" />
      </Stylearrow>
    );
  }
}


const Countries = ({countries}) => {
  const [direction,setdirection] = useState();
  const [value,setvalue]=useState();
  const orderedCountries = orderby(countries, value, direction)
  const switchDirection = () =>{
    if(!direction){
      setdirection("desc");
    }else if(direction === "desc"){
      setdirection("asc")
    }else{
      setdirection(null)
    }
  }

  const setvalueanddirection = (value) =>{
    switchDirection()
    setvalue(value)
  }

  return (
    <Wrapper>
      <Heading>
        <HeadingName onClick={() => setvalueanddirection('name')}>
          <div>Name</div>
          <SortArrow />
        </HeadingName>

        <HeadingPopulation onClick={() => setvalueanddirection('population')}>
          <div>Population</div>
          <SortArrow direction={direction} />
        </HeadingPopulation>
      </Heading>
      {orderedCountries.map((country) => {
        return (
          <Link
            href={`/country/${country.alpha3Code}`}
            key={country.id}
            passHref
          >
            <Rowcontainer>
              <div className="name">{country.name}</div>
              <div className="population">{country.population}</div>
            </Rowcontainer>
          </Link>
        );
      })}
    </Wrapper>
  );
}

export default Countries
