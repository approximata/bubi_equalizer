var BubiEQ = React.createClass({

  getInitialState: function () {
    return {
      bubis: []
    };
  },

  componentDidMount: function() {
    let that = this;
    fetch('http://localhost:3000/meals', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      cache: 'default',
    }).then(function(response){
      return response.json();
    }).then(function(mealResponse){
      that.setState({meal: mealResponse});
      console.log(mealResponse);
    })
  },

  render: function () {
    return (
      <div className="jumbotron">
      <header className="container">
        <h1 className="col-sm-8">calorie counter</h1>
      </header>
        <div className="inputfield">
          <input className="name" type="text" name="inputMeal" placeholder="insert food" onChange={this.handleInputMealChange}/>
          <input className="calorie" type="number" name="inputCalorie" placeholder="insert number of calorie" onChange={this.handleInputCalorieChange}/>
          <input className="date" type="date" name="inputDate" onChange={this.handleInputDateChange}/>
          <button className="button-text" type="button" onClick={this.addMeal}>
            add
          </button>
          <button className="show-all" onClick={this.consoleMemory}>showall</button>
          <input className="filter" type="date" name="filter" onChange={this.handleFilterChange}/>
          <button className="buttonfilter" type="button" onClick={this.filterMeals}>filter</button>
        </div>
        <div className="food-list">
          <div className="foodholder">
              {this.state.meal.map((meal) =>
              <div key={meal.id}>
                <div className="food-item" name="listed">
                  <p>{meal.name}</p>
                  <p>{meal.calorie}</p>
                  <p>{meal.date}</p>
                  <div className="buttons" key={meal.id}>
                    <button className="delete" type="button" id={meal.id} onClick={this.deleteMeals}></button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="sum">calorie sum: </div>
        </div>
      </div>
    );
  }
});
ReactDOM.render(
  <Counter />,
  document.querySelector('.main')
);
