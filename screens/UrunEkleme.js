import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NumericInput from "react-native-numeric-input";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native";
import firebase from "firebase/app";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";

export const UrunEkleme = ({ route }) => {
  const [number, setNumber] = React.useState(number);

  const getRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 999999) + 100000;
    setNumber(randomNumber);
  };

  const { GeneralResponse } = useSelector((state) => state);
  const navigation = useNavigation();
  const [UrunAdi, setUrunadi] = useState(String);
  const [urunMarkasi, setUrunMarkasi] = useState(String);
  const [urunrengi, setUrunrengi] = useState(String);
  const [urunstok, setUrunstok] = useState(Number);
  const [urundetay, setUrunDetay] = useState(String);
  const [urunkategori, setUrunKategori] = useState(String);
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const createStok = () => {
    try {
      firebase.firestore().collection(GeneralResponse.email).add({
        UrunStok: urunstok,
        UrunRengi: urunrengi,
        UrunMarkasi: urunMarkasi,
        UrunAdi: UrunAdi,
        UrunKategori: urunkategori,
        UrunDetay: urundetay,
        UrunUrl: image,
        UrunId: number,
      }).then(
        setUrunadi(""),
        setUrunrengi(""),
        setUrunDetay(""),
        setUrunMarkasi(""),
        setUrunKategori(""),
        setUrunstok(0),
        setImage(null),
      );
      navigation.navigate("Stok Sayfasi");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View>
      <ScrollView style={{ width: "100%", height: "100%" }}>
        <View style={styles.cerceve}>
          <Text>Ürün Adı :</Text>
          <TextInput
            style={styles.textinput}
            value={UrunAdi}
            onChangeText={setUrunadi}
            placeholderTextColor={"grey"}
            placeholder={"Bilgisayar, Scooter vb.."}
          />
        </View>
        <View style={styles.cerceve}>
          <Text>Ürün Markası :</Text>
          <TextInput
            style={styles.textinput}
            value={urunMarkasi}
            onChangeText={setUrunMarkasi}
            placeholderTextColor={"grey"}
            placeholder="Bosch, Casper vb.."
          />
        </View>
        <View style={styles.cerceve}>
          <Text>Ürün Rengi :</Text>
          <TextInput
            style={styles.textinput}
            value={urunrengi}
            onChangeText={setUrunrengi}
            placeholderTextColor={"grey"}
            placeholder="Kırmızı, Siyah vb.."
          />
        </View>
        <View style={styles.cerceve}>
          <Text>Ürün Kategorisi :</Text>
          <TextInput
            style={styles.textinput}
            value={urunkategori}
            onChangeText={setUrunKategori}
            placeholderTextColor={"grey"}
            placeholder="Beyaz Eşya, Akıllı Telefon vb.."
          />
        </View>
        <View style={styles.detaycercevesi}>
          <Text>Ürün Detay :</Text>
          <TextInput
            numberOfLines={8}
            style={styles.textinput}
            value={urundetay}
            onChangeText={setUrunDetay}
            placeholderTextColor={"grey"}
            placeholder="(Örnek) Örnek Marka 3500mAh Bataryalı Akıllı Telefon"
          />
        </View>

        <View
          style={{
            width: "90%",
            marginLeft: "5%",
            marginTop: "10%",
            flexDirection: "row",
          }}
        >
          <View style={{ marginLeft: "10%" }}>
            <Text>Ürün Fotoğrafı :</Text>
            <View style={styles.resimcercevesi}>
              <Pressable
                onPress={pickImage}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <Ionicons
                  style={{ marginLeft: "10%" }}
                  name="folder"
                  size={35}
                  color="black"
                />
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 100, height: 100, borderRadius: 5 }}
                  />
                )}
              </Pressable>
            </View>
          </View>
          <View style={{ marginLeft: "10%" }}>
            <View>
              <Text>Stok Sayisi:</Text>
              <NumericInput
                minValue={0}
                maxValue={999}
                valueType="integer"
                value={urunstok}
                style={styles.textinput1}
                onChange={setUrunstok}
                placeholderTextColor={"blue"}
                keyboardType="numeric"
                placeholder="Ürünün Stok Sayısını Giriniz"
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.Button}>
        <Button
          title="Kayıt Et"
          onPress={() => {
            getRandomNumber();
            createStok();
          }}
        />
      </View>
    </View>
  );
};

export default UrunEkleme;

const styles = StyleSheet.create({
  textinput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
    fontSize: 14,
    fontWeight: "300",
    paddingLeft: 9,
  },
  textinput1: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
    fontSize: 14,
    fontWeight: "300",
    paddingLeft: 9,
  },
  Text: {
    fontWeight: "700",
    alignSelf: "center",
    borderBottomWidth: 1,
  },
  cerceve: {
    height: 50,
    marginTop: "1.5%",
    width: "90%",
    marginLeft: "5%",
  },
  Button: {
    position: "absolute",
    alignSelf: "center",
    marginTop: 580,
  },
  detaycercevesi: {
    marginTop: "7%",
    width: "90%",
    marginLeft: "5%",
    height: 100,
  },
  resimcercevesi: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
    height: 139,
    width: 102,
    borderRadius: 5,
  },
});
