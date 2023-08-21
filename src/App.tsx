import { registerRootComponent } from "expo";
import { RecoilRoot } from "recoil";
import { ActivityIndicator, View, Animated, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts, Inter_900Black } from "@expo-google-fonts/dev";
import { HomeScreen } from "./screens/HomeScreen";
import { AudioScreen } from "./screens/AudioScreen";
import { useState } from "react";
import { set } from "@coral-xyz/anchor/dist/cjs/utils/features";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const [selectedSong, setSelectedSong] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  return (
    <>
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={{
          tabBarActiveTintColor: "#A084E8",
        }}
      >
        <Tab.Screen
          name='Home'
          children={() => (
            <HomeScreen
              setSelectedSong={setSelectedSong}
              setSelectedName={setSelectedName}
              setSelectedImage={setSelectedImage}
            />
          )}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='home' color={color} size={size} />
            ),
          }}
          initialParams={{ setSelectedSong }}
        />
        <Tab.Screen
          name='AudioPlayer'
          children={() => (
            <AudioScreen
              selectedSong={selectedSong}
              selectedName={selectedName}
              selectedImage={selectedImage}
            />
          )}
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
