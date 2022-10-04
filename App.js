import * as React from "react";
import { View, Text, Pressable } from "react-native";

import { Ionicons, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import {createStore } from "redux"
import  reducer from "./screens/redux";

import UrunDetay from "./screens/UrunDetay";
import UrunEkleme from "./screens/UrunEkleme";
import Login from "./screens/Login";
import HomeScreen from "./screens/HomeScreen";
import Register from "./screens/Register";
import UrunGuncelleme from "./screens/UrunGuncelleme";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const store = createStore(reducer)
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Main"
            component={BottomTab}
            options={{ headerShown: false }}
          />
          <Stack.Group>
            <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }}/>
            <Stack.Screen name="Kayıt Ekranı" component={Register}/>
            <Stack.Screen name="Ürün Güncelleme" component={UrunGuncelleme} />
            <Stack.Screen name="Ürün Detayı" component={UrunDetay} />
            <Stack.Screen name="Stok Sayfasi" component={HomeScreen} />
            <Stack.Screen name="Urun Ekleme" component={UrunEkleme} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Stok Sayfasi"
        component={HomeScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({}) => {
            return <Ionicons name="list" color="blue" size={30} />;
          },
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <Pressable
                onPress={() => navigation.navigate("Login")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <Ionicons name="exit" size={35} color="black" />
              </Pressable>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Urun Ekleme"
        component={UrunEkleme}
        options={({ navigation }) => ({
          tabBarIcon: ({}) => {
            return <Entypo name="add-to-list" color="blue" size={30} />;
          },
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <Pressable
                onPress={() => navigation.navigate("Login")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <Ionicons name="exit" size={35} color="black" />
              </Pressable>
            </View>
          ),
        })}
      />
      {/* <Tab.Screen
        name="Urun Takip"
        component={UrunTakip}
        options={({ navigation }) => ({
          tabBarIcon: ({}) => {
            return <Ionicons name="qr-code-outline" color="blue" size={30} />;
          },
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <Pressable
                onPress={() => navigation.navigate("Login")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <Ionicons name="exit" size={35} color="black" />
              </Pressable>
            </View>
          ),
        })}
      /> */}
    </Tab.Navigator>
  );
};
