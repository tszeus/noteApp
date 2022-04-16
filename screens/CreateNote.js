import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { Button, Text } from "@ui-kitten/components";
import React from "react";

export default function CreateNote() {
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const navigation = useNavigation();

  const saveNote = async () => {
    const value = await AsyncStorageLib.getItem("NOTES");
    const n = value ? JSON.parse(value) : [];
    if (note.length) {
      n.push({ date: getDate(), title, note });
      Keyboard.dismiss();
      await AsyncStorageLib.setItem("NOTES", JSON.stringify(n)).then(() =>
        navigation.navigate("AllNotes")
      );
    }

    setNote("");
    setTitle("");
  };
  //   AsyncStorageLib.clear();

  var date = new Date();
  const getNum = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
  };
  const getDate = () => {
    return date.toDateString();
  };
  const getTime = () => {
    return `Today  ${getNum(date.getHours())} : ${getNum(date.getMinutes())}`;
  };
  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff" }}>{getTime()}</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.inputTitle}
        multiline={true}
        selectionColor="#222B45"
        placeholder="Type your title"
      />
      <TextInput
        value={note}
        onChangeText={setNote}
        style={styles.inputNote}
        multiline={true}
        autoFocus
        selectionColor="#222B45"
        placeholder="Type your note"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.bottom}
      >
        <Button style={styles.button} appearance="filled" onPress={saveNote}>
          Save Note
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222B45",
    color: "white",
    padding: 30,
    paddingTop: 50,
    width: Dimensions.get("window").width,
  },
  inputTitle: {
    backgroundColor: "#333",
    fontSize: 16,
    color: "#fff",
    borderRadius: 8,
    padding: 12,
    textDecorationLine: "none",
    height: 54,
    marginBottom: 30,
    marginTop: 10,
  },
  inputNote: {
    backgroundColor: "#333",
    fontSize: 20,
    color: "#fff",
    borderRadius: 8,
    padding: 12,
    textDecorationLine: "none",
    height: "50%",
    marginBottom: 30,
  },
  bottom: {
    // flex: 1,
    justifyContent: "flex-end",
    // marginBottom: 36,
  },
  button: {
    marginBottom: 30,
  },
});
