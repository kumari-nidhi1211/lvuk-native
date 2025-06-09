import { StyleSheet, FlatList, Text, TextInput, View} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ParallaxFlatList from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface User {
  id: number;
  name: string;
  // add other fields if needed
}

const HEADER_HEIGHT = 170;

export default function TabTwoScreen() {
  const [users, setUsers] = useState<User[]>([]); // added the type for User
  const [query, setQuery] = useState("");

  // Fetch users only once on component mount
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      // catch the error if promise get failed.
      .catch((err) => console.error("Failed to fetch users", err));
  }, []); // Added empty dependency array [] on first fetch to fetch users only once

  // Memoize filteredUsers to optimize filtering performance
  const filteredUsers = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    return users.filter(user => user.name.toLowerCase().includes(lowerQuery));
  }, [query, users]);

  const renderItem = useCallback(({ item }: { item: User }) => (
    <Text style={styles.user}>{item.name}</Text>
  ), []);

  const keyExtractor = useCallback((item: User) => item.id.toString(), []); // use unique user id 


  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <IconSymbol
          size={310}
          color="#808080"
          name="brain.head.profile.fill"
          style={styles.headerImage}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Search users..."
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
        />
        <FlatList<User>
          data={filteredUsers}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={<Text style={styles.noResults}>No users found.</Text>} // In case no user match the search
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    position: 'absolute',
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  user: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  noResults: {
    padding: 16,
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
  },
});
