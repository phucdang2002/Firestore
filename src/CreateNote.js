import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { notesCollection } from "../firebaseConfig";
import Ionicons from "react-native-vector-icons/Ionicons";

const CreateNote = ({navigation}) => {
  const { noteId } = {};
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (noteId) {
      // If editing, fetch the existing note
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
      // If both title and content are empty, do nothing or handle accordingly
      return;
    }

    if (noteId) {
      // Update existing note
      await notesCollection.doc(noteId).update({
        title,
        content,
      });
    } else {
      // Create a new note
      await notesCollection.add({
        title,
        content,
        createdAt: new Date(),
      });
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
        <TouchableOpacity onPress={()=>saveNote()}>
          <Ionicons name="checkmark" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
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
    backgroundColor: "#FFFDE7", // Light, soft background
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
    backgroundColor: "#FFF9C4", // Subtle highlight for title input
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
