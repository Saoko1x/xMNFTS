import { registerRootComponent } from "expo";
import { RecoilRoot } from "recoil";
import { ActivityIndicator, View, Animated, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts, Inter_900Black } from "@expo-google-fonts/dev";
import { HomeScreen } from "./screens/HomeScreen";
import { AudioScreen } from "./screens/AudioScreen";
import tailwind from "twrnc";
import { useState, useEffect, useRef } from "react";
import toast, { useToaster } from "react-hot-toast";
import Constants from "expo-constants";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const [selectedSong, setSelectedSong] = useState("");
  console.log(selectedSong);
  return (
    <>
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={{
          tabBarActiveTintColor: "#e91e63",
        }}
      >
        <Tab.Screen
          name='Home'
          children={() => <HomeScreen setSelectedSong={setSelectedSong} />}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='home' color={color} size={size} />
            ),
          }}
          initialParams={{ setSelectedSong }}
        />
        <Tab.Screen
          name='Audio Player'
          children={() => <AudioScreen selectedSong={selectedSong} />}
          options={{
            tabBarLabel: "Player",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='music' color={color} size={size} />
            ),
          }}
          initialParams={{ audioId: selectedSong }}
        />
      </Tab.Navigator>
    </>
  );
}

function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <RecoilRoot>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default registerRootComponent(App);
