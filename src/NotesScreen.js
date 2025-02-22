import React, { useEffect, useState } from "react";
import { 
    FlatList, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, 
    StyleSheet, 
    Button
} from "react-native";
import { notesCollection } from "../firebaseConfig";

const COLORS = ["#C8E6C9", "#BBDEFB", "#FFCDD2", "#FFF9C4", "#B2EBF2", "#E1BEE7"];

const NotesScreen = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");

    useEffect(() => {
        const unsubscribe = notesCollection.orderBy("createdAt", "desc").onSnapshot((snapshot) => {
            const notesList = snapshot.docs.map((doc, index) => ({
                id: doc.id,
                content: doc.data().content,
                color: COLORS[index % COLORS.length], // Assign color
            }));
            setNotes(notesList);
        });
        return () => unsubscribe();
    }, []);

    const addNote = async () => {
        if (newNote.trim() === "") return;
        await notesCollection.add({
            content: newNote,
            createdAt: new Date(),
        });
        setNewNote("");
    };

    const deleteNote = async (id) => {
        await notesCollection.doc(id).delete();
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={newNote}
                onChangeText={setNewNote}
                placeholder="Enter a note"
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            />
            <Button title="Save Note" onPress={addNote} />
            <Text style={styles.header}>Recent Notes</Text>

            <FlatList
                data={notes}
                keyExtractor={(item) => item.id}
                numColumns={2} // Grid layout
                contentContainerStyle={styles.notesList}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={[styles.noteCard, { backgroundColor: item.color }]}
                        onPress={() => deleteNote(item.id)}
                    >
                        <Text style={styles.noteText}>{item.content}</Text>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity style={styles.fab} onPress={addNote}>
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
        paddingBottom: 80, // Avoid overlap with FAB
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
