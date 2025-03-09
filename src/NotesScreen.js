import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import auth from "@react-native-firebase/auth";
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { notesCollection } from "../firebaseConfig";

const COLORS = ["#C8E6C9", "#BBDEFB", "#FFCDD2", "#FFF9C4", "#B2EBF2", "#E1BEE7"];

const NotesScreen = ({ navigation }) => {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        const unsubscribe = notesCollection
            .orderBy("createdAt", "desc").onSnapshot((snapshot) => {
                const notesList = snapshot.docs
                    .filter(doc => doc.data().uid === auth().currentUser.uid)
                    .map((doc, index) => ({
                        id: doc.id,
                        title: doc.data().title,
                        content: doc.data().content,
                        uid: doc.data().uid,
                        color: COLORS[index % COLORS.length],
                    }));
                setNotes(notesList);
            });
        return () => unsubscribe();
    }, []);


    const deleteNote = async (id) => {
        await notesCollection.doc(id).delete();
    };
    const handleLogout = () => {
        auth().signOut().then(() => navigation.navigate("Login")).catch((error) => console.log(error));
    }
    return (
        <View style={styles.container}>
            <Icon name="logout" size={24} onPress={handleLogout} />
            <Text style={styles.header}>Recent Notes</Text>
            <FlatList
                data={notes}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.notesList}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.noteCard, { backgroundColor: item.color }]}
                        onPress={() => deleteNote(item.id)}
                    >
                        <Text style={styles.noteTitle}>{item.title}</Text>
                        <Text style={styles.noteText}>{item.content}</Text>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("CreateNote")}>
                <Text style={{ color: "#fff", fontSize: 24 }}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

export default NotesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    notesList: {
        paddingBottom: 80,
    },
    noteCard: {
        flex: 1,
        margin: 8,
        padding: 16,
        borderRadius: 12,
        minHeight: 100,
        justifyContent: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: "500",
        color: "#333",
    },
    noteText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
    fab: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#F44336",
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});
