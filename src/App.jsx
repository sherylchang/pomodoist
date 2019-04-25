import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      // TODO 1
      items: [],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null,
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      // TODO 2: initialize new item object
      id: nextItemId,
      description: description,
      sessionsCompleted: 0,
      isCompleted: false,
    };
    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      items: prevState.items.concat(newItem),
      nextItemId: prevState.nextItemId + 1, 
    })));
  }

  clearCompletedItems() {
    // TODO 6
    const filtered = this.state.items.filter(item => item.isCompleted === false);
    this.setState({
      items: filtered,
    })
  }

  increaseSessionsCompleted(itemId) {
    // TODO 5
    let copyList = this.state.items.slice(0);
    let i;
    for (i = 0; i < copyList.length; i++) { 
      if (copyList[i].id === itemId) {
        copyList[i].sessionsCompleted += 1;
      }
    }
    this.setState({
      items: copyList,
    });  
  }

  toggleItemIsCompleted(itemId) {
    // TODO 6
    let copyList = this.state.items.slice(0);
    let i;
    for (i = 0; i < copyList.length; i++) { 
      if (copyList[i].id === itemId) {
        if (copyList[i].isCompleted === false) {
          copyList[i].isCompleted = true;
        } else {
          copyList[i].isCompleted = false;
        }
      }
    }
    this.setState({
      items: copyList,
    });
  }

  startSession(id) {
    this.setState({
      sessionIsRunning: true,
      itemIdRunning: id, 
    });
  }

  render() { 
    const {
      items,
      nextItemId,
      sessionIsRunning,
      itemIdRunning,
    } = this.state;

    let areItemsMarkedAsCompleted;

    let count = 0;
    let i;
    for (i = 0; i < items.length; i++) { 
      if (items[i].isCompleted === true) {
        count += 1;
      }
    }

    if (count === 0) {
      areItemsMarkedAsCompleted = false;
    } else {
      areItemsMarkedAsCompleted = true;
    }

    return (
      <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            { (areItemsMarkedAsCompleted === true) && <ClearButton onClick={this.clearCompletedItems} />}
          </header>
          { (sessionIsRunning === true) && <Timer
              mode="WORK"
              onSessionComplete={() => this.increaseSessionsCompleted(itemIdRunning)}
              autoPlays
            /> }
            <div className="items-container">
            {items.length === 0 ? (<EmptyState />) : 
              (/* TODO 3:  display todo items */
              items.map((item) => (
                <TodoItem 
                  description={item.description} 
                  sessionsCompleted={item.sessionsCompleted}
                  isCompleted={item.isCompleted}
                  startSession={() => this.startSession(item.id)}
                  toggleItemIsCompleted={() => this.toggleItemIsCompleted(item.id)}
                  key={item.id}
                />
              )))
            }
            </div>
        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;
