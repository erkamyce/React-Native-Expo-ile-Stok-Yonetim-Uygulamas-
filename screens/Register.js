import { View, Text, StyleSheet, Image, TextInput,ScrollView } from "react-native";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { SetEmail, SetParola } from "./redux/action";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { GeneralResponse } = useSelector((state) => state);
  const handleSignUp = () => {
      auth
        .createUserWithEmailAndPassword(GeneralResponse.email, GeneralResponse.parola)
        .then((userCredentials) => {
          const user = userCredentials.user;
          alert("Kaydınız Başarılı Girş Yapabilirisiniz");
          navigation.navigate("Login")
        })
        .catch((error) => alert(error.message));
  };

  return (
    <View>
      <View>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmThj86UTp-I_ia0lrcyPzOuqXWXDKHf37Nw&usqp=CAU",
          }}
          style={styles.backround}
        />
        <View style={styles.genelcerceve}>
          <TextInput
            style={styles.kullaniciadi}
            placeholder="E-Mail"
            value={GeneralResponse.email}
            onChangeText={(text) => dispatch(SetEmail(text))}
          />
          <TextInput
            style={styles.kullaniciadi}
            placeholder=" Parola"
            value={GeneralResponse.parola}
            onChangeText={(text) => dispatch(SetParola(text))}
            secureTextEntry
          />
          <Text
            style={styles.girisdugmesi}
            onPress={(handleSignUp)}
          >
            Kayıt Ol
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
    genelcerceve: {
        borderWidth: 1,
        borderColor: "lightblue",
        borderRadius: 40,
        marginTop: 100,
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: "white",
        width: 300,
        height: 450,
        position: "absolute",
      },
      kullaniciadi: {
        paddingLeft: 8,
        justifyContent: "center",
        alignSelf: "center",
        fontSize: 20,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 8,
        width: 200,
        height: 40,
        marginTop: 20,
      },
      backround: {
        height: 800,
        width: 500,
        position: "absolute",
      },
      girisdugmesi: {
        width: 100,
        marginTop: 30,
        textAlign: "center",
        justifyContent: "center",
        alignSelf: "center",
        fontSize: 20,
        borderWidth: 1,
        borderColor: "grey",
        backgroundColor: "lightblue",
        borderRadius: 20,
      },
});
