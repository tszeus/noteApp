import { StyleSheet, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { Button, Text } from "@ui-kitten/components";
import React from "react";

export default function Note({ route }) {
  const [notes, setNotes] = useState([]);
  const { indexNote, title, date, note } = route.params;
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      getNotes();
      console.log(
        notes.map((note) => `${note.date}\t${note.title}\t${note.note}`)
      );
    }, [])
  );

  const getNotes = () => {
    AsyncStorageLib.getItem("NOTES").then((notes) =>
      setNotes(JSON.parse(notes))
    );
  };

  const deleteNote = async () => {
    const newNotes = await notes.filter((note, index) => index !== indexNote);
    await AsyncStorageLib.setItem("NOTES", JSON.stringify(newNotes)).then(() =>
      navigation.navigate("AllNotes")
    );
  };

  return (
    <View style={{ backgroundColor: "#222B45", flex: 1 }}>
      <Text style={styles.title} category="h1">
        {title}
      </Text>
      <Text style={styles.date} category="h1">
        {date}
      </Text>
      <Text style={{ fontSize: 22, margin: 20 }}>{note}</Text>
      <View style={styles.bottom}>
        <Button onPress={deleteNote} style={styles.bottom}>
          Delete
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  item: {
    marginVertical: 4,
  },
  title: {
    textAlign: "center",
    color: "#F5B554",
    marginTop: 50,
  },
  date: {
    fontSize: 12,
    textAlign: "center",
  },
  notes: {
    fontSize: 14,
  },
  bottom: { width: "95%", alignSelf: "center" },
});
