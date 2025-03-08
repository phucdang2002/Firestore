import auth from "@react-native-firebase/auth";
import { GoogleSigninButton, GoogleSignin } from "@react-native-google-signin/google-signin";
import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
GoogleSignin.configure({
    webClientId: '1021956021490-j5ncut9veo6pitsmkig1fa5f1i952ft5.apps.googleusercontent.com',
});
const Login = ({navigation}) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const handleSignIn = () => {
        auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                navigation.navigate('Notes');
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.data.idToken);
            auth().signInWithCredential(googleCredential).then(()=>navigation.navigate('Notes'));
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.subtitle}>Taking - Note</Text>

            <TextInput style={styles.input} placeholder="Username, Email & Phone Number" onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword}/>

            <TouchableOpacity>
                <Text style={styles.forgotPassword} onPress={()=>navigation.navigate("Register")}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                <Text style={styles.signInText}>Sign in</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.orText}>Or Sign up With</Text>
                <View style={styles.divider} />
            </View>

            <GoogleSigninButton size={GoogleSigninButton.Size.Icon} onPress={handleGoogleSignIn} />
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
    forgotPassword: {
        alignSelf: "flex-end",
        color: "#555",
        marginBottom: 20,
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

export default Login;
