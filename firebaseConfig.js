import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";

export const notesCollection = firestore().collection("notes");
export const getFCMToken = async () => {
    const token = await messaging().getToken();
    return token;
}