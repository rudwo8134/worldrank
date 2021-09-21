import React from 'react'
import styled from 'styled-components'
import { SearchRounded } from '@material-ui/icons'
import style from '../../../staticstyle'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${style.Backgroundcolordark};
  border-radius: 8px;
  padding-left: 16px;
  color: ${style.textSecondary};
  input {
    border: none;
    background-color: transparent;
    padding: 16px;
    width: 100%;
    height: 100%;
    outline: none;
    color: ${style.textSecondary};

    ::placeholder {
      color: ${style.textSecondary};
    }
  }
`;

const Searchroundeicon = styled(SearchRounded)`

`



const Searchinput = ({...rest}) => {
  return (
    <Wrapper>
      <Searchroundeicon color="inherit"/>
      <input {...rest} />
    </Wrapper>
  )
}

export default Searchinput
