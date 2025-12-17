import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const CharacterCard = ({ character, onPress }) => {
  const statusColor =
    character.status === 'Alive'
      ? Colors.statusAlive
      : character.status === 'Dead'
      ? Colors.statusDead
      : Colors.statusUnknown;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.detail}>
          <Text style={{ color: statusColor }}>● </Text>
          {character.status} - {character.species}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 4,
  },
  image: { width: 100, height: 100 },
  info: { flex: 1, justifyContent: 'center', paddingLeft: 16 },
  name: { color: Colors.text, fontSize: 18, fontWeight: 'bold' },
  detail: { color: '#aaa', fontSize: 14 },
});

export default CharacterCard;