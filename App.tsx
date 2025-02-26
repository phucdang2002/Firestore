import { NavigationContainer } from "@react-navigation/native";
import CreateNote from "./src/CreateNote";
import NotesScreen from "./src/NotesScreen";
import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Notes" component={NotesScreen} options={{headerShown: false}}/>
        <Stack.Screen name="CreateNote" component={CreateNote} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
