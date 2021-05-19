import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  useEffect(() => {
    setLoading(true);

    async function getDetails() {
      await fetch(`${url}${id}`)
        .then(response => response.json())
        .then(data => {
          console.log('data > ', data);
          if (data) {
            const drink = data.drinks[0];
            const detailedDrink = {
              "id": drink.idDrink,
              "name": drink.strDrink,
              "image": drink.strDrinkThumb,
              "info": drink.strAlcoholic,
              "glass": drink.strGlass,
              "category": drink.strCategory,
              "instructions": drink.strInstructions,
              "ingredients": [drink.strIngredient1,
              drink.strIngredient2,
              drink.strIngredient3,
              drink.strIngredient4,
              drink.strIngredient5,
              drink.strIngredient6,
              drink.strIngredient7,
              drink.strIngredient8,
              drink.strIngredient9,
              drink.strIngredient10]
            }
            console.log(detailedDrink);
            setCocktail(detailedDrink);
          }
          else {
            setCocktail(null);
          }
          setLoading(false);
        })
        .catch(error => console.error(error));
    }
    getDetails();
  }, [id]);

  if (loading) {
    return <Loading />
  }
  if (!cocktail) {
    return <h2>No Cocktail details found</h2>
  }
 else {
  const {
    name,
    image,
    category,
    info,
    glass,
    instructions,
    ingredients,
  } = cocktail
  return (
    <section className='section cocktail-section'>
      <Link to='/' className='btn btn-primary'>
        back home
      </Link>
      <h2 className='section-title'>{name}</h2>
      <div className='drink'>
        <img src={image} alt={name}></img>
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name :</span> {name}
          </p>
          <p>
            <span className='drink-data'>category :</span> {category}
          </p>
          <p>
            <span className='drink-data'>info :</span> {info}
          </p>
          <p>
            <span className='drink-data'>glass :</span> {glass}
          </p>
          <p>
            <span className='drink-data'>instructons :</span> {instructions}
          </p>
          <p>
            <span className='drink-data'>ingredients :</span>
            {ingredients.map((item, index) => {
              return item ? <span key={index}> {item}</span> : null
            })}
          </p>
        </div>
      </div>
    </section>
  )
}
}


export default SingleCocktail
