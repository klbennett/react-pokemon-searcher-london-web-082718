import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  state = {
    pokemons: [],
    filter: "",
    sortByName: false
  }

  callAPI() {
    fetch('http://localhost:3000/pokemon')
    .then(resp => resp.json())
    .then(pokemons => 
      this.setState({ pokemons })
      )
  }

  componentDidMount() {
    this.callAPI()
  }

  addPokemonToList = (newPokemon) => {
    this.setState({ pokemons: [...this.state.pokemons, newPokemon]})
  }

  updateFilter = (input) => {
    this.setState({ filter: input })
    let { pokemons } = this.state
    console.log(this.state.filter)
    return pokemons.filter(pk => pk.name.includes(this.state.filter) )
  }

  filteredPokemons = () => {
    let { pokemons } = this.state
    this.state.sortByName ? pokemons = pokemons.sort((a, b) => a.name.localeCompare(b.name)) : null
    return pokemons.filter(pk => pk.name.includes(this.state.filter))
  }

  sortAlphabetically = () => {
    this.setState({ sortByName: !this.state.sortByName})
  }


  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce((e, input) => this.updateFilter(input.value), 500)} showNoResults={false} />
        <br />
        <button name="sort-alphabetically" onClick={this.sortAlphabetically}>Sort by name</button>
        <br />
         <PokemonCollection pokemons={this.filteredPokemons()}/> 
        <br />
        <PokemonForm addPokemon={this.addPokemonToList}/>
      </div>
    )
  }
}

export default PokemonPage
