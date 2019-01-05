import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'ChatMessage'
    }
    this.changeView = this.changeView.bind(this);
  }

  changeView(view) {
  }