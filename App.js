import React, { Component} from 'react'
import AppNavigator from './src/navigation/AppNavigator'
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import { ActivityIndicator, Text, View } from "react-native";
import gql from "graphql-tag";

const client = new ApolloClient({ uri: 'http://192.168.8.140:5000/graphql' });
export const AppContext = React.createContext({ data: { coins: null } });

class App extends Component {
  state = {
    query: null,
  }
  componentDidMount() {
    const query = this.getQuery();
    this.setState({
      query
    });
  }
  getQuery = () => {
    return `
    query {
      coins{
        time_period_start
        time_period_end
        time_open
        time_close
        price_low
        price_high
        volume_traded
        trades_count
    }
    }
    `
}

  render(){
    const {  query } = this.state;
    if (!query) return null;

    return (
      <ApolloProvider client={client}>
        <Query query={gql`${query}`} >
          {({ loading, error, data }) => {
            if (loading || error) return <ActivityIndicator   size="large" color="#0000ff" />
            return (
              <AppContext.Provider value={{coins:{...data.coins}, onPress: this.onGetNewPokemon}} >
                <AppNavigator/>
            </AppContext.Provider>
            )
          }}
        </Query>
      </ApolloProvider>
    ) 
  }
  onGetNewPokemon = () => {
    const query = this.getQuery();
    this.setState({
      query
    });
  }
}

export default App;