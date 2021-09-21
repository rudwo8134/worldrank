import React,{useState,useEffect} from 'react'
import style from '../../../staticstyle';
import styled from 'styled-components';
import Layout from '../../components/Layout/Layout';

const getcountry = async (id) => {
    const res = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${id}`
    );

    const country = await res.json()
  
  return country
}

const Wrapper = styled.div`
  .detailpanel {
    background-color: ${style.Backgroundcolorlight};
    box-shadow: ${style.boxShadow};
    border-radius: 8px;
    .details {
      padding: 20px;
      padding-bottom: 0;
    }
    .pannelrow {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      border-bottom: 1px solid #e0e0e0;
      .pannellable {
        font-weight: 500;
        color: ${style.textSecondary};
      }
    }
    .detailborders{
      padding:20px;
      .detailbordertitle{
        color: ${style.textSecondary};
        margin-bottom:20px;
      }
    } 
    .bordercontainer {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 24px;
      img {
        width: 100%;
        border-radius: 4px;
      }
      .detailborderscountry {
        text-align: center;
      }
    }
  }
  .overviewPanel {
    padding: 20px;
    border-radius: 8px;
    box-shadow: ${style.boxShadow};
    background-color: ${style.Backgroundcolorlight};
    img {
      width: 100%;
      border-radius: 4px;
    }
    .overviewName {
      text-align: center;
      font-size: 32px;
      margin-bottom: 0;
    }
    .overviewRegion {
      text-align: center;
      font-size: 14px;
      font-weight: 300;
      margin-top: 4px;
      margin-bottom: 24px;
    }
    .numbers {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      text-align: center;
      .overveiwLabel {
        font-size: 14px;
        color: ${style.textSecondary};
      }
    }
  }
`;

const Country = ({ country }) => {
  const [borders, setborders] = useState([])

  const getBorders = async () =>{
  const borders = await Promise.all(
    country.borders.map((border) => getcountry(border))
  )
    setborders(borders)
  }

  useEffect(() => {
    getBorders();
  }, [])


  return (
    <Layout title={country.name}>
      <Wrapper>
        <div className="overviewPanel">
          <img src={country.flag} alt={country.name} />
          <h1 className="overviewName">{country.name}</h1>
          <div className="overviewRegion">{country.region}</div>

          <div className="numbers">
            <div className="population">
              <div className="overviewValue">{country.population}</div>
              <div className="overveiwLabel">populataion</div>
            </div>
            <div className="area">
              <div className="overviewValue">{country.area}</div>
              <div className="overveiwLabel">area</div>
            </div>
          </div>
        </div>

        <div className="detailpanel">
          <h4 className="details">Details</h4>

          <div className="pannelrow">
            <div className="pannellable">Capital</div>
            <div className="pannelvalue">{country.capital}</div>
          </div>

          <div className="pannelrow">
            <div className="pannellable">Subregion</div>
            <div className="pannelvalue">{country.subregion}</div>
          </div>

          <div className="pannelrow">
            <div className="pannellable">Language</div>
            <div className="pannelvalue">
              {country.languages.map(({ name }) => name).join(',')}
            </div>
          </div>

          <div className="pannelrow">
            <div className="pannellable">Currencies</div>
            <div className="pannelvalue">
              {country.currencies.map(({ name }) => name).join(',')}
            </div>
          </div>

          <div className="pannelrow">
            <div className="pannellable">Native name</div>
            <div className="pannelvalue">{country.nativeName}</div>
          </div>

          <div className="pannelrow">
            <div className="pannellable">Gini</div>
            <div className="pannelvalue">{country.gini}</div>
          </div>

          <div className="detailborders">
            <div className="detailbordertitle">Border Countries</div>
            <div className="bordercontainer">
              {borders.map(({ flag, name, id }) => {
                return (
                  <div key={id} className="detailborderscountry">
                    <img src={flag} alt={name} />
                    <div className="detailbordersname">{name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({params}) => {
  const country = await getcountry(params.id)
  return {
    props: {
      country,
    },
  };
}