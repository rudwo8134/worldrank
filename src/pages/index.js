import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout/Layout'
import styled from 'styled-components'
import Searchinput from '../components/Searchinput/Searchinput'
import style from '../../staticstyle'
import Countries from '../components/Countriestable/Countries'
import { useState } from 'react'

const Counts = styled.div`
  margin: 12px 0;
  color: ${style.textSecondary};
`

export default function Home({ countries }) {
  
  const [keyword,setkeyword] = useState('')

  const filtercountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const oninputchange = (e) =>{
    e.preventDefault();
    setkeyword(e.target.value.toLowerCase())
  }
  return (
    <Layout>
      <Counts> Found {countries.length} countries</Counts>
      <Searchinput
        placeholder="Filter by Name, Region or SubRegion"
        onChange={oninputchange}
      />

      <Countries countries={filtercountries} />
    </Layout>
  );
}

export const getStaticProps = async() =>{
  const res = await fetch("https://restcountries.eu/rest/v2/all")
  const countries = await res.json();
  
  return {
    props: {
      countries,
    },
  };
}