import React, { Component } from "react";
import "./PokeFetch.css";


class PokeFetch extends Component {
  constructor() {
    super();
    this.state = {
      pokeInfo: "",
      pokeSprite: "",
      pokeName: "",
      timer: 10,
      displayPokemon: false
    };
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          displayPokemon: false,
        });
        this.startTimer();
      })
      .catch((err) => console.log(err)); 
  }

  startTimer = () => {
    let timeRemaining = 10;
    const countDown = () => {
      timeRemaining = timeRemaining - 1;
      if (timeRemaining <= 0) {
        
        this.setState({ timer: 0, displayPokemon: true });
        //clear interval
        clearInterval(newTimer);
      } else {
        this.setState({ timer: timeRemaining });
      }
    };
    const newTimer = setInterval(countDown, 1000);
  };

  render() {
    return (
      <div className={"wrapper"}>
        <button className={"start"} onClick={() => this.fetchPokemon()}>
          Start!
        </button>
        <h1 className={"timer"}>Time Remaining: {this.state.timer}</h1>
        <div className={"pokeWrap"}>
          <img className={"pokeImg"} src={this.state.pokeSprite} alt="pokeImage"  style={ !this.state.displayPokemon ? {filter: 'brightness(0%)'} : {filter: 'brightness(100%)'} } />
          <h1 className={"pokeName"}>{ this.state.displayPokemon ? this.state.pokeName : ""} </h1>
        </div>
      </div>
    );
  }
}

export default PokeFetch;
