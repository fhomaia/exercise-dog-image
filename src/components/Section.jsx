import React from 'react';

class Section extends React.Component {
    constructor() {
        super();
        this.fetchDogs = this.fetchDogs.bind(this)
        this.save = this.save.bind(this)
        this.onChange = this.onChange.bind(this)
        this.state = {
            newdog: "",
            loading: "true",
            dogName: "",
            save: [],
        }
    }

    fetchDogs() {
        this.setState({ loading: "true"}, () => {
          fetch('https://dog.ceo/api/breeds/image/random')
          .then((response) => response.json())
          .then((response) => {
            this.setState({
                newdog: response.message,
                loading: false,
                dogname: "",
            });
          })
        }
        ); 
    }

    componentDidMount() {
      const displayDogsArray = JSON.parse(localStorage.getItem('dogsarray'))
      if(displayDogsArray) {
          this.setState({
            newdog: displayDogsArray[displayDogsArray.length - 1].savedimg,
            loading: false,
            dogname: "",
            save: displayDogsArray,
          })
      } else {
        this.fetchDogs();
      }
    }

    save() {
      this.setState((prev) => ({
        dogname: "",
        save: [...prev.save, {
            savedimg: this.state.newdog,
            savedname: this.state.dogname,
        }],
        }),() => localStorage.setItem('dogsarray', JSON.stringify(this.state.save)))
    }

    onChange({target}) {
        this.setState({
            dogname: target.value
        })
    }

    render() {
      console.log(this.state.save)
        return(
            <section>
                { this.state.loading? <p>Loading...</p> : <img src={this.state.newdog}  alt="dog" height="200px"></img> }
                <div>
                <input placeholder="Nome do Dog" type="text" onChange={ e => this.onChange(e) } value={ this.state.dogname}/>
                </div>
                <div>
                <button onClick={ this.fetchDogs }> Novo dog </button>
                <button onClick={ this.save }> Save </button>
                </div>
            </section>
        )
    }
}

export default Section;