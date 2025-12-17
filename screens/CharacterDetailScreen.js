import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { fetchCharacterById } from '../services/api';
import Colors from '../constants/Colors';

const CharacterDetailScreen = ({ route }) => {
  const { characterId } = route.params;
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCharacterById(characterId);
        setCharacter(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [characterId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!character) return null;

  const statusColor =
    character.status === 'Alive'
      ? Colors.statusAlive
      : character.status === 'Dead'
      ? Colors.statusDead
      : Colors.statusUnknown;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.status}>
          <Text style={{ color: statusColor }}>● </Text>
          {character.status} - {character.species} - {character.gender}
        </Text>

        <View style={styles.section}>
          <Text style={styles.label}>Origem</Text>
          <Text style={styles.value}>{character.origin.name}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Localização Atual</Text>
          <Text style={styles.value}>{character.location.name}</Text>
        </View>

        {character.type ? (
          <View style={styles.section}>
            <Text style={styles.label}>Tipo</Text>
            <Text style={styles.value}>{character.type}</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background },
  image: { width: '100%', height: 400, resizeMode: 'cover' },
  infoContainer: { padding: 20 },
  name: { fontSize: 28, fontWeight: 'bold', color: Colors.text, marginBottom: 8 },
  status: { fontSize: 18, color: '#aaa', marginBottom: 24 },
  section: { marginBottom: 16 },
  label: { fontSize: 16, color: Colors.primary, fontWeight: '600' },
  value: { fontSize: 18, color: Colors.text },
});

export default CharacterDetailScreen;