import React , {useEffect} from 'react'
import { Text, View, StyleSheet,FlatList,ActivityIndicator, TouchableOpacity, TextInput} from 'react-native'
import {AppContext} from '../../App';
import _ from 'lodash';

import ListItem from '../components/ListItem'

function CoinsList(props) {
  const [search,_setSearch]=React.useState('');
  const { navigation } = props;

  const setSearch=(value)=>{
    _setSearch(value)
  }
  
  const getList=(coins)=>{
   if(_.isEmpty(search)) 
   return coins;
   return _.filter(coins,(item)=>item.price_high>parseInt(search))
  }
  return (
    <AppContext.Consumer>
      {({ coins=[] }) =>
         <FlatList
           style={styles.container}
           contentContainerStyle={styles.container}
           ListHeaderComponent={()=><TextInput keyboardType="decimal-pad" style={{backgroundColor:'white',height:100,width:100}} onChangeText={setSearch}/>}
           // data={_.isEmpty(search)? coins: _.filter(coin,{price_low===parseFloat(price_low)}) }
           data={getList(coins) }
           keyExtractor={item => item.time_close}
           renderItem={({ item, }) => {
             return (
               <ListItem
                 coin={item}
                 onPress={() => navigation.navigate('Detail', { coin: item })}
               />
             )
           }}
         />
      }
  </AppContext.Consumer>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    // alignItems: 'center'
  },
  boldText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  loadingIndicatorContainer: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default CoinsList