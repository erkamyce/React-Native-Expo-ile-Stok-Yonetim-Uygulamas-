import { StyleSheet, Text, View, Image, Pressable, Button } from "react-native";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { ScrollView } from "react-native";

const UrunDetay = ({ route }) => {
  const [stokartir, setstokartir] = useState(route.params.data.UrunStok);
  const navigation = useNavigation();
  const { GeneralResponse } = useSelector((state) => state);
  return (
    <View>
      <View>
        <View style={styles.fotocercevesi}>
          <View style={styles.esyafotocercevesi}>
            <Image
              source={{
                uri: route.params.data.UrunUrl,
              }}
              style={styles.foto}
            />
          </View>

          <View>
            <Text style={styles.detayyazisi}>
              <Text style={styles.baslik}>Ürün Adı : </Text>
              {route.params.data.UrunAdi}
            </Text>
            <Text style={styles.detayyazisi}>
              <Text style={styles.baslik}>Ürün Markası : </Text>
              {route.params.data.UrunMarkasi}
            </Text>
            <Text style={styles.detayyazisi}>
              <Text style={styles.baslik}>Ürün Stok Sayısı : </Text>
              {route.params.data.UrunStok}
            </Text>
            <Text style={styles.detayyazisi}>
              <Text style={styles.baslik}>Ürün Rengi : </Text>
              {route.params.data.UrunRengi}
            </Text>
          </View>
        </View>
        <View style={styles.kategori}>
          <Text style={{ padding: 3 }}>
            <Text style={styles.baslik}>Ürün Kategorisi : </Text>
            {route.params.data.UrunKategori}
          </Text>
        </View>
        <View style={styles.kategori}>
          <Text style={{ padding: 3 }}>
            <Text style={styles.baslik}>Ürün Id : </Text>
            {route.params.data.UrunId}
          </Text>
        </View>
        <Text style={styles.baslik}>Ürün Detay Yazısı</Text>
        <View style={styles.detaycercevesi}>
          <Text numberOfLines={6} style={styles.detayparagrafi}>
            {route.params.data.UrunDetay}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ marginLeft: 10, marginRight: 85 }}>
            <Text style={{fontWeight:"700"}}>Ürün Silme</Text>
            <Pressable
              onPress={() => {
                firebase
                  .firestore()
                  .collection(GeneralResponse.email)
                  .doc(route.params.data.id)
                  .delete()
                  .then(() => {
                    navigation.navigate("Main");
                  });
              }}
              style={({ pressed }) => ({
                paddingLeft:10,
                opacity: pressed ? 0.9 : 1,
              })}
            >
              <MaterialIcons name="delete" size={45} color="darkred" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UrunDetay;

const styles = StyleSheet.create({
  detaycercevesi: {
    height: "45%",
    borderWidth: 1,
    borderColor: "grey",
    width: "95%",
    marginLeft: "2.5%",
    marginTop: "2%",
    borderRadius: 20,
  },
  baslik: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
    marginRight: 1,
    marginTop: 2,
  },
  foto: {
    borderRadius: 20,
    height: "100%",
    width: 100,
    borderWidth: 1,
    borderColor: "grey",
  },
  fotocercevesi: {
    borderRadius: 20,
    height: 100,
    marginLeft: "2.5%",
    width: "95%",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
  },
  esyafotocercevesi: {
    elevation: 6,
    shadowOpacity: 1,
    shadowColor: "blue",
    borderRadius: 20,
    borderColor: "lightblue",
    marginLeft: 4,
    width: 100,
    height: "100%",
  },
  detayyazisi: {
    fontSize: 16,
    fontWeight: "400",
    marginLeft: 10,
    marginRight: 1,
    marginTop: 2,
  },
  kucukcerceve: {
    flexDirection: "column",
  },
  detayparagrafi: {
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 12,
  },
  kategori: {
    width: "90%",
    marginLeft: "5%",
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
  },
  Url: {
    width: "90%",
    height: 80,
    marginLeft: "5%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
  },
});
