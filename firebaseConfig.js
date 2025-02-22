import firestore from "@react-native-firebase/firestore";

export const notesCollection = firestore().collection("notes");