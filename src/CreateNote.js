import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getFCMToken, notesCollection } from "../firebaseConfig";
import Ionicons from "react-native-vector-icons/Ionicons";

const CreateNote = ({ navigation }) => {
  const { noteId } = {};
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (noteId) {
      const unsubscribe = notesCollection.doc(noteId).onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setTitle(data.title || "");
          setContent(data.content || "");
        }
      });
      return () => unsubscribe();
    }
  }, [noteId]);

  const saveNote = async () => {
    if (!title.trim() && !content.trim()) {
      return;
    }
    if (noteId) {
      await notesCollection.doc(noteId).update({
        title,
        content,
      });
    } else {
      await notesCollection.add({
        title,
        content,
        createdAt: new Date(),
      });
      const token = await getFCMToken();

      await fetch("http://localhost:8080/send-notification", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: token, message: "A new note has been added!" }),
      })
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>
          {noteId ? "Edit Note" : "Create Note"}
        </Text>
        <TouchableOpacity onPress={() => saveNote()}>
          <Ionicons name="checkmark" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <TextInput
          style={styles.titleInput}
          placeholder="Note Title"
          placeholderTextColor="#aaa"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.bodyInput}
          placeholder="Note Content"
          placeholderTextColor="#aaa"
          value={content}
          onChangeText={setContent}
          multiline
        />
      </View>
    </View>
  );
};

export default CreateNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDE7",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: "#FFFDE7",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    justifyContent: "space-between",
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#FFF9C4",
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: "#333",
  },
  bodyInput: {
    flex: 1,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: "#FFF9C4",
    paddingHorizontal: 12,
    paddingVertical: 8,
    textAlignVertical: "top",
    color: "#333",
  },
});
