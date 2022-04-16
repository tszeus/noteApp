import { StyleSheet, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { Divider, List, ListItem, Text } from "@ui-kitten/components";
import React from "react";

export default function AllNotes() {
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      getNotes();
    }, [])
  );

  const getNotes = () => {
    console.log("first");
    AsyncStorageLib.getItem("NOTES").then((notes) => {
      {
        if (notes !== null) {
          setNotes(JSON.parse(notes));
        }
      }
    });
  };

  const renderItem = ({ item, index }) => (
    <ListItem
      title={
        <View style={styles.itemBox}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDate}>{item.date}</Text>
          </View>
          <Text style={styles.itemNote}>{item.note}</Text>
        </View>
      }
      onPress={() => {
        navigation.navigate("Note", {
          indexNote: index,
          title: item.title,
          data: item.date,
          note: item.note,
        });
      }}
      style={styles.item}
    />
  );
  return (
    <View style={{ backgroundColor: "#222B45", flex: 1 }}>
      <List
        style={styles.container}
        data={notes.map((note) => note)}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
    paddingTop: 50,
    // alignItems: "center",
  },
  item: {
    marginVertical: 4,
    backgroundColor: "#333",
    width: "90%",
    alignSelf: "center",
    borderRadius: 8,
  },
  itemBox: {},
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemDate: {
    fontSize: 10,
  },
  itemTitle: {
    color: "#F5B554",
    fontSize: 15,
  },
  itemNote: {
    paddingLeft: 20,
    fontSize: 12,
  },
  title: {
    textAlign: "center",
    marginTop: 50,
  },
  notes: {
    fontSize: 24,
  },
});
