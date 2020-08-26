import React, { Component } from 'react';
import styled from 'styled-components';
import Lane from '../components/Lane/Lane';
import withDataFetching from '../withDataFetching';

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

class Board extends Component {
  constructor() {
    super();
    this.state = {
      tickets: []
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({ tickets: this.props.data });
    }
  };

  onDragStart = (event, id) => {
    event.dataTransfer.setData('id', id);
  };

  onDragOver = (event) => {
    event.preventDefault();
  };

  onDrop = (event, laneId) => {
    const id = event.dataTransfer.getData('id');

    const tickets = this.state.tickets.filter(ticket => {
      if (ticket.id === Number(id)) {
        ticket.lane = laneId;
      };

      return ticket;
    });

    this.setState({
      tickets
    })
  };

  render() {
    const { lanes, loading, error } = this.props;

    return (
      <BoardWrapper>
        {
          lanes.map(lane =>
            <Lane
              key={lane.id}
              laneId={lane.id}
              title={lane.title}
              error={error}
              onDragStart={this.onDragStart}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
              loading={loading}
              tickets={this.state.tickets.filter(ticket => ticket.lane === lane.id)}
            />
          )
        }
      </BoardWrapper>
    )
  }
};

export default withDataFetching(Board);
