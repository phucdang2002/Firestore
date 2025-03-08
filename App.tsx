import { NavigationContainer } from "@react-navigation/native";
import CreateNote from "./src/CreateNote";
import NotesScreen from "./src/NotesScreen";
import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";
import { Alert, PermissionsAndroid } from "react-native";
import { useEffect } from "react";
import { getFCMToken } from "./firebaseConfig";
import messaging from "@react-native-firebase/messaging";
import Login from "./src/Login";
import Register from "./src/Register";
import auth from "@react-native-firebase/auth";
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
const Stack = createStackNavigator();
function App(): React.JSX.Element {
  useEffect(() => {
    getFCMToken();
    // Lắng nghe khi nhận thông báo
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("New Notification: " + remoteMessage.notification?.body);
    });
    return unsubscribe;
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={auth().currentUser ? "Notes" : "Login"}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Notes" component={NotesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateNote" component={CreateNote} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
