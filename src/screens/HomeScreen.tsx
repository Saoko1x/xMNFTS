import tw from "twrnc";
import React from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native"; // Import ScrollView here
import tailwind from "twrnc";
import { useEffect, useState } from "react";
import { set } from "@coral-xyz/anchor/dist/cjs/utils/features";
import toast from "react-hot-toast";

export function HomeScreen({ setSelectedSong }: { setSelectedSong: any }) {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const publicKey = window.xnft.solana.publicKey?.toBase58();

    console.log(publicKey);
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
      console.log(nfts_data);
      setNfts(nfts_data.result);
    }
    fetchNFTs();
  }, [window.xnft]);

  return (
    <ScrollView
      contentContainerStyle={tailwind`flex flex-row flex-wrap w-full justify-center`}
    >
      <View>
        {nfts.map((nft: any, index) => {
          return (
            <Pressable
              key={index} // Make sure to add a unique key for each item in the map function
              style={[
                tailwind`m-10 bg-white rounded-xl w-full max-w-xs items-center justify-center`,
                {
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                },
              ]}
              onPress={() => {
                setSelectedSong(nft.attributes.song);
                toast.success("Song selected!");
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
          );
        })}
      </View>
    </ScrollView>
  );
}
