import { useNavigation } from "@react-navigation/native";
import React from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { List } from "react-native-paper";
import { useState, useEffect } from "react";
import { Searchbar } from 'react-native-paper';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Image,
  Button,
  TextInput,
} from "react-native";
import { auth } from "../firebase";
import firebase from "firebase/app";
import { useDispatch, useSelector } from "react-redux";

export const HomeScreen = () => {
  const [searchQuery, setSearchQuery] =useState("");
  const dispatch = useDispatch();
  const { GeneralResponse } = useSelector((state) => state);
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };
  const [stok, setstok] = useState([]);
  const armabari=useState(true);
  // useEffect(()=>{
  //   return firebase.firestore().collection('stok').onSnapshot((querySnapshot)=>{
  //     setstok(querySnapshot.docs.map((x) => x.data().UrunAdi))
  //   })
  // },[1])
     
  const list = firebase.firestore().collection(GeneralResponse.email).where("UrunAdi", ">=",searchQuery);
   

  

  useEffect(() => {
    list.onSnapshot((querySnapshot) => {
      const stok = [];
      querySnapshot.forEach((doc) => {
        const {
          UrunAdi,
          UrunMarkasi,
          UrunRengi,
          UrunStok,
          UrunDetay,
          UrunUrl,
          UrunKategori,
          UrunId,
        } = doc.data();
        stok.push({
          id: doc.id,
          UrunAdi,
          UrunRengi,
          UrunMarkasi,
          UrunStok,
          UrunDetay,
          UrunUrl,
          UrunKategori,
          UrunId,
        });
      });
      setstok(stok);
    });
  }, [searchQuery]);

  return (
    <View style={styles.container}>
          <Searchbar
      placeholder="Search"
      value={searchQuery}
      onChangeText={(text)=>setSearchQuery(text)}
      
    />
      <View style={styles.stokcercevesi}>
        <FlatList
          style={styles.flatlist}
          data={stok}
          renderItem={({ item }) => (
            <View >
              <View style={styles.baslikcercevesi}>
                  <View style={styles.esyafotosucercevesi}>
                    <Image
                      style={styles.esyafotosu}
                      source={{ uri: item.UrunUrl }}
                    />
                  </View>
                <View style={styles.bilgicercevesi}>
                  <View style={styles.aciklamapenceresi}>
                    <Text style={{ fontWeight: "400" }}> Ürün Adı : </Text>
                    <View style={{ width: 130 }}>
                      <Text numberOfLines={1} style={{ color: "grey" }}>
                        {item.UrunAdi}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.aciklamapenceresi}>
                    <Text style={{ fontWeight: "400" }}> Ürün Markasi: </Text>
                    <Text style={{ color: "grey" }}>{item.UrunMarkasi}</Text>
                  </View>
                  <View style={styles.aciklamapenceresi}>
                    <Text style={{ fontWeight: "400" }}> Urun Rengi : </Text>
                    <View style={{ width: 130 }}>
                      <Text numberOfLines={1} style={{ color: "grey" }}>
                        {item.UrunRengi}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.sayacpenceresi}>
                  <Text style={styles.sayacyazisi}>Stok :</Text>
                  <Text style={styles.sayacyazisi}>{item.UrunStok}</Text>
                </View>
              </View>

              <View
                style={{
                  height: 25,
                  width: "85%",
                  alignSelf: "center",
                  flexDirection: "row",
                }}
              >
                <Pressable onPress={() => {
                    navigation.navigate("Ürün Detayı", { data: item });
                  }}
                  style1={({ pressed }) => ({
                    opacity: pressed ? 0.9 : 1,
                  })} style={styles.urundetayi}>
                  <View>
                    <Text style={{ alignSelf: "center", color: "black",marginTop:1, }}>
                      Ürün Detayı
                    </Text>
                  </View>
                </Pressable>
                <Pressable onPress={() => {
                    navigation.navigate("Ürün Güncelleme", { data: item });
                  }}
                  style1={({ pressed }) => ({
                    opacity: pressed ? 0.9 : 1,
                  })} style={styles.urunguncelleme} >
                  <View >
                    <Text style={{ alignSelf: "center", color: "black",marginTop:1, }}>
                      Ürün Güncelleme
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    textAlign: "center",
    borderRadius: 10,
    alignItems: "center",
    width: 100,
    height: 25,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  stokcercevesi: {
    backgroundColor:"lightgrey",
    flex: 1,
  },
  baslikcercevesi: {
    flexDirection: "row",
    marginTop: 8,
    borderRadius: 20,
    marginLeft: "3%",
    width: "94%",
    height: 80,
    backgroundColor: "white",
    elevation:8,
  },
  esyafotosucercevesi: {
    elevation: 6,
    shadowOpacity: 1,
    shadowColor: "blue",
    borderRadius: 20,
    borderColor: "lightblue",
    marginLeft: 4,
    marginTop: 4,
    width: 70,
    height: 70,
  },
  esyafotosu: {
    borderRadius: 20,
    width: "100%",
    height: "100%",
  },
  aciklamapenceresi: {
    flexDirection: "row",
    width: "90%",
    marginTop: "3%",
    marginLeft: 4,
  },
  sayacpenceresi: {
    borderRadius: 20,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "lightgrey",
    marginRight:15,
    width:60,
    height:30
  },
  sayacyazisi: {
    alignSelf:"center"
  },
  bilgicercevesi: {
    flexDirection: "column",
    width: "60%",
    height: "100%",
  },
  sayac: {
    fontSize: 1,
    height: 0,
    width: 110,
  },
  urundetayi: {
    marginRight:1,
    elevation:24,
    borderWidth:1,
    borderColor:"lightgrey",
    backgroundColor:"white",
    borderRadius: 4,
    height: "100%",
    width: "50%",
  },
  urunguncelleme: {
    borderWidth:1,
    borderColor:"lightgrey",
    marginLeft:1,
    borderWidth:1,
    elevation:24,
    backgroundColor:"white",
    borderRadius: 4,
    height: "100%",
    width: "50%",
  },
});
