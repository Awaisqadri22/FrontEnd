import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

function ListItem(props) {
    const { coin, onPress } = props
    const { price_high ,price_low ,trades_count} = coin
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => onPress && onPress(coin)}>
        <View style={styles.row}>
          <Text style={styles.text} numberOfLines={1}>
            {price_high}
          </Text>
          <View style={styles.right}>
            <Text style={styles.text} numberOfLines={1}>
              {price_low}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, styles.name]} numberOfLines={1}>
            {trades_count}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, active: { backgroundColor: 'rgba(255,255,255,0.05)' },
row: { flexDirection: 'row', justifyContent: 'space-between' },
right: { flex: 1, alignSelf: 'flex-end', alignItems: 'flex-end' },
text: { color: '#FFFFFF', fontSize: 24, fontWeight: '500' },
name: { color: 'rgba(255,255,255,0.5)', fontSize: 16, fontWeight: '300' } })

export default ListItem