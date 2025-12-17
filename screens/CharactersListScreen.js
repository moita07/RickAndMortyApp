import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import CharacterCard from '../components/CharacterCard';
import { fetchCharacters } from '../services/api';
import Colors from '../constants/Colors';

const CharactersListScreen = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [search, setSearch] = useState('');

  const loadCharacters = useCallback(async (isLoadMore = false, searchTerm = '') => {
    if (loading || loadingMore) return;

    if (!isLoadMore) setLoading(true);
    else setLoadingMore(true);

    try {
      const data = await fetchCharacters(isLoadMore ? null : 1, searchTerm);
      if (!isLoadMore) {
        setCharacters(data.results);
      } else {
        setCharacters(prev => [...prev, ...data.results]);
      }
      setNextPageUrl(data.info.next);
    } catch (error) {
      console.error(error);
      if (!isLoadMore) setCharacters([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadCharacters(false, '');
  }, []);

  // Busca com debounce simples
  useEffect(() => {
    const timer = setTimeout(() => {
      loadCharacters(false, search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const loadMore = () => {
    if (nextPageUrl && !loadingMore) {
      // Como a API aceita ?name=...&page=..., reutilizamos fetchCharacters com page extraído ou simplesmente recarregamos com search atual
      // Para simplicidade, recarregamos a partir da página 1 com filtro
      // Mas para paginar com filtro, melhor usar next URL diretamente
      // Vamos ajustar fetchCharacters para aceitar url completa também
      // (adicionaremos uma função extra)
    }
  };

  // Ajuste rápido: vamos usar a URL next diretamente
  const loadMoreCharacters = async () => {
    if (!nextPageUrl || loadingMore) return;
    setLoadingMore(true);
    try {
      const response = await axios.get(nextPageUrl);
      const data = response.data;
      setCharacters(prev => [...prev, ...data.results]);
      setNextPageUrl(data.info.next);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading && characters.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar personagem..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={characters}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={() => navigation.navigate('Detail', { characterId: item.id })}
          />
        )}
        onEndReached={loadMoreCharacters}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <ActivityIndicator style={{ margin: 20 }} /> : null}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background },
  searchInput: {
    margin: 16,
    padding: 12,
    backgroundColor: Colors.card,
    borderRadius: 8,
    color: Colors.text,
    fontSize: 16,
  },
});

export default CharactersListScreen;