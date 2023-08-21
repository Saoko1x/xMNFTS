import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import tailwind from "twrnc";
import toast from "react-hot-toast";
import { useNavigation } from "@react-navigation/native";

export function HomeScreen({
  setSelectedSong,
  setSelectedName,
  setSelectedImage,
}: {
  setSelectedSong: any;
  setSelectedName: any;
  setSelectedImage: any;
}) {
  const [nfts, setNfts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const publicKey = window.xnft.solana.publicKey?.toBase58();

    async function fetchNFTs() {
      var myHeaders = new Headers();
      myHeaders.append("x-api-key", "yuNXtSyS8hhVTdkn");

      const nfts = await fetch(
        `https://api.shyft.to/sol/v1/nft/read_all?network=devnet&address=${publicKey}`,
        {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        }
      );
      const nfts_data = await nfts.json();
      setNfts(nfts_data.result);
    }
    fetchNFTs();
  }, [window.xnft]);

  return (
    <ScrollView
      contentContainerStyle={tailwind`flex flex-row flex-wrap w-full justify-center p-4`}
    >
      {nfts.map((nft: any, index) => (
        <Pressable
          key={index}
          style={[
            tailwind`m-4 bg-white rounded-xl w-full max-w-xs items-center justify-center shadow-md`,
          ]}
          onPress={() => {
            setSelectedSong(nft.attributes.song);
            setSelectedName(nft.name);
            setSelectedImage(nft.image_uri);
            navigation.navigate("AudioPlayer");
          }}
        >
          <Image
            source={{ uri: nft.attributes.image }}
            style={tailwind`w-full h-64 rounded-t-xl`}
            resizeMode='cover'
          />
          <View style={tailwind`p-6`}>
            <Text style={tailwind`text-slate-900 text-lg font-bold`}>
              {nft.name}
            </Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
