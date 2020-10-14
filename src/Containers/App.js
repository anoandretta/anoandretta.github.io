import React, { Component } from 'react';
import CardList from '../Components/CardList'
import SearchBox from '../Components/SearchBox'
import Scroll from '../Components/Scroll'
import ErrorBoundry from '../Components/ErrorBoundry'
import './App.css'


class App extends Component {
    constructor () {
        super()
      
        // oq muda é this.state
        this.state = {
            robots: [],
            searchfield: ''
        }
    }


    // ComponentDidMount é do React, então não precisa chamar
componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=> response.json())
    .then(users => this.setState({ robots: users}));

}

    onSearchChange = (event) => {
       this.setState({ searchfield: event.target.value})        
    }

    render () {
        const { robots, searchfield } = this.state;
        const filterRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        
        if(robots.length === 0) {
            return <h1>Loading...</h1>
        } else {
        
        return(
            <div className='tc'>
                 <h1 className='f1'>RoboFriends</h1>
                 <SearchBox searchChange={this.onSearchChange}/>
                 <Scroll>
                     <ErrorBoundry>
                        <CardList robots={filterRobots}/>
                    </ErrorBoundry>
                 </Scroll>
            </div>
        );

        }
    }
    
}

export default App;