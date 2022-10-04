import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Pressable,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import NumericInput from "react-native-numeric-input";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native";
import firebase from "firebase/app";
import { useDispatch, useSelector } from "react-redux";

const UrunGuncelleme = ({ route }) => {
  const { GeneralResponse } = useSelector((state) => state);
  const navigation = useNavigation();
  const [UrunAdi, setUrunadi] = useState(route.params.data.UrunAdi);
  const [urunMarkasi, setUrunMarkasi] = useState(route.params.data.UrunMarkasi);
  const [urunrengi, setUrunrengi] = useState(route.params.data.UrunRengi);
  const [urunstok, setUrunstok] = useState(route.params.data.UrunStok);
  const [urundetay, setUrunDetay] = useState(route.params.data.UrunDetay);
  const [image, setImage] = useState(route.params.data.UrunUrl);
  const [urunkategori, setUrunKategori] = useState(
    route.params.data.UrunKategori
  );
  const pickImage = async () => {
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
  return (
    <View>
      <ScrollView>
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginLeft: "10%", marginTop: 10 }}>
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
          <View style={styles.stokpenceresi}>
            <Text>Stok Sayısı : </Text>
            <NumericInput
              valueType="integer"
              value={urunstok}
              style={styles.textinput}
              onChange={setUrunstok}
              placeholderTextColor={"blue"}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View>
          <View style={styles.cerceve}>
            <Text style={styles.baslik}> Ürün Adı </Text>
            <TextInput
              style={styles.textinput}
              value={UrunAdi}
              onChangeText={(text) => setUrunadi(text)}
              placeholderTextColor={"grey"}
            />
          </View>
        </View>
        <View>
          <View style={styles.cerceve}>
            <Text style={styles.baslik}> Ürün Rengi </Text>
            <TextInput
              style={styles.textinput}
              value={urunrengi}
              onChangeText={(text) => setUrunrengi(text)}
              placeholderTextColor={"grey"}
            />
          </View>
        </View>
        <View>
          <View style={styles.cerceve}>
            <Text style={styles.baslik}> Ürün Markası </Text>
            <TextInput
              style={styles.textinput}
              value={urunMarkasi}
              onChangeText={(text) => setUrunMarkasi(text)}
              placeholderTextColor={"grey"}
            />
          </View>
        </View>
        <View>
          <View style={styles.cerceve}>
            <Text style={styles.baslik}> Ürün Kategorisi </Text>
            <TextInput
              style={styles.textinput}
              value={urunkategori}
              onChangeText={(text) => setUrunKategori(text)}
              placeholderTextColor={"grey"}
            />
          </View>
        </View>
        <View>
          <View style={styles.detaycerceve}>
            <Text style={styles.detaybaslik}> Ürün Detay </Text>
            <TextInput
              numberOfLines={4}
              style={styles.detaytextinput}
              value={urundetay}
              onChangeText={(text) => setUrunDetay(text)}
              placeholderTextColor={"grey"}
            />
          </View>
        </View>
        <View style={styles.button}>
          <Button
            title="Stok Güncelle"
            onPress={() => {
              firebase
                .firestore()
                .collection(GeneralResponse.email)
                .doc(route.params.data.id)
                .update({
                  UrunStok: urunstok,
                  UrunAdi: UrunAdi,
                  UrunMarkasi: urunMarkasi,
                  UrunDetay: urundetay,
                  UrunKategori: urunkategori,
                  UrunRengi: urunrengi,
                  UrunUrl: image,
                })
                .then(() => {
                  navigation.navigate("Main");
                });
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default UrunGuncelleme;
const styles = StyleSheet.create({
  resimcercevesi: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
    height: 139,
    width: 102,
    borderRadius: 5,
  },
  stokpenceresi: {
    marginTop: 10,
    marginLeft: "20%",
  },
  cerceve: {
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "90%",
    borderWidth: 1,
    marginTop: "5%",
    marginLeft: "5%",
    flexDirection: "row",
  },
  baslik: {
    width: "35%",
    paddingTop: 3,
    borderRightWidth: 1,
    fontWeight: "600",
  },
  textinput: {
    paddingLeft: 10,
    width: "65%",
  },
  detaybaslik: {
    fontWeight: "600",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    width: "35%",
    marginTop: "5%",
    marginLeft: "5%",
  },
  detaytextinput: {
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingLeft: 5,
    borderWidth: 1,
    width: "90%",
    marginLeft: "5%",
    height: 50,
  },
  button: {
    width: "60%",
    marginLeft: "20%",
    marginTop: "40%",
  },
});
