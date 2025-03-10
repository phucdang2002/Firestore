import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import auth from '@react-native-firebase/auth';
import { useState } from "react";
const Register = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSignUp = () => {
        auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                navigation.navigate('Notes');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                  console.log('That email address is already in use!');
                }
                if (error.code === 'auth/invalid-email') {
                  console.log('That email address is invalid!');
                }
                console.error(error);
              });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign up</Text>
            <TextInput style={styles.input} placeholder="Username, Email & Phone Number" onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword}/>
            <TouchableOpacity style={styles.signInButton} onPress={handleSignUp}>
                <Text style={styles.signInText}>Sign up</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>Have an account <TouchableOpacity onPress={()=>navigation.navigate("Login")}><Text style={styles.signIn}>Sign in</Text></TouchableOpacity></Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 16,
        color: "gray",
        marginBottom: 30,
    },
    input: {
        width: "100%",
        padding: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: "#f5f5f5",
    },
    signInButton: {
        backgroundColor: "#f593fc",
        paddingVertical: 15,
        width: "100%",
        alignItems: "center",
        borderRadius: 10,
    },
    signInText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    signIn: {
        fontWeight: "700",
        alignItems: "center",
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: "#ccc",
    },
    orText: {
        marginHorizontal: 10,
        color: "gray",
        justifyContent: "center",
        alignItems: "center",

    },
    googleButton: {
        padding: 10,
        borderRadius: 50,
    },
    googleIcon: {
        width: 40,
        height: 40,
    },
});

export default Register;
