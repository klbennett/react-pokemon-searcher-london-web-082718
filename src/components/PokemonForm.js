import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value})
  }

  handleSubmit = () => {
    let {name, hp, frontUrl, backUrl} = this.state
    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'stats': {
          'value': hp,
          'name': 'name'
        },
        'sprites' : {
          'front': frontUrl,
          'back': backUrl,
        }
      })
    }).then(resp => resp.json())
    .then(pokemon => {
      this.setState(this.props.addPokemon(pokemon))
    })

  }


  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange.bind(this)} required/>
            <Form.Input fluid label="hp" placeholder="hp" name="hp" value={this.state.hp} onChange={this.handleChange.bind(this)} required/>
            <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" value={this.state.frontUrl} onChange={this.handleChange.bind(this)} required/>
            <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" value={this.state.backUrl} onChange={this.handleChange.bind(this)} required/>
          </Form.Group>
          <Form.Button onClick={this.addPokemon}>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
