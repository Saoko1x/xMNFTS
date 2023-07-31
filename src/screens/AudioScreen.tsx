import { Pressable, View, Text, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tailwind from "twrnc";
import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";

export const AudioScreen = ({ selectedSong }: { selectedSong: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [seekTime, setSeekTime] = useState(0);

  const playerRef = useRef(null);
  const handlePlayButtonClick = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handleBackwardButtonClick = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - 90000);
    }
  };
  const handleForwardButtonClick = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 90000);
    }
  };

  const handleLoopButtonClick = () => {
    setIsLooping((prevIsLooping) => !prevIsLooping);
  };

  const handleSeekChange = (value) => {
    setSeekTime(value);
    if (playerRef.current) {
      playerRef.current.seekTo(value);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View>
      <View
        style={tailwind`flex flex-wrap justify-center items-center mt-10 mb-10 p-5`}
      >
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/009/384/065/original/audio-cassette-tape-clipart-design-illustration-free-png.png",
          }}
          style={tailwind`w-full h-64 rounded-t-xl md:w-1/2 md:h-64`}
        />
      </View>
      <ReactPlayer
        ref={playerRef}
        url={selectedSong}
        controls={false}
        onPlay={() => console.log("onPlay")}
        playing={isPlaying}
        loop={isLooping}
        width='100%'
        height='10%'
        onProgress={(progress) => {
          setSeekTime(progress.playedSeconds);
        }}
      />
      <View style={tailwind`flex flex-row justify-center items-center`}>
        <Text>{formatTime(seekTime)}</Text>
        <input
          type='range'
          style={tailwind`w-1/2`}
          value={seekTime}
          min={0}
          max={playerRef.current ? playerRef.current.getDuration() : 0}
          step={0.0}
          onChange={(e) => handleSeekChange(parseFloat(e.target.value))}
        />
        <Text>
          {playerRef.current && formatTime(playerRef.current.getDuration())}
        </Text>
      </View>
      <View style={tailwind`flex flex-row justify-center items-center`}>
        <button id='shuffleButton' style={tailwind`border-transparent`}>
          <Pressable
            style={({ pressed }) => [
              tailwind`bg-[#3F4754] h-12 px-6 items-center justify-center rounded-full`,
              pressed ? tailwind`bg-[#647187]` : null,
            ]}
          >
            <Text style={tailwind`text-white font-bold text-base`}>
              <MaterialCommunityIcons name='shuffle' size={15} />
            </Text>
          </Pressable>
        </button>
        <button id='backwardButton' style={tailwind`border-transparent`}>
          <Pressable
            onPress={handleBackwardButtonClick}
            style={({ pressed }) => [
              tailwind`bg-[#3F4754] h-12 px-6 items-center justify-center rounded-full`,
              pressed ? tailwind`bg-[#647187]` : null,
            ]}
          >
            <Text style={tailwind`text-white font-bold text-base`}>
              <MaterialCommunityIcons name='step-backward' size={15} />
            </Text>
          </Pressable>
        </button>
        <button id='playButton' style={tailwind`border-transparent`}>
          <Pressable
            onPress={handlePlayButtonClick}
            style={({ pressed }) => [
              tailwind`bg-[#CC6B49] h-12 px-6 items-center justify-center rounded-full`,
              pressed ? tailwind`bg-[#7a3f2b]` : null,
            ]}
          >
            <Text style={tailwind`text-white font-bold text-base`}>
              <MaterialCommunityIcons
                name={isPlaying ? "pause" : "play"}
                size={15}
              />
            </Text>
          </Pressable>
        </button>
        <button id='backwardButton' style={tailwind`border-transparent`}>
          <Pressable
            onPress={handleForwardButtonClick}
            style={({ pressed }) => [
              tailwind`bg-[#3F4754] h-12 px-6 items-center justify-center rounded-full`,
              pressed ? tailwind`bg-[#647187]` : null,
            ]}
          >
            <Text style={tailwind`text-white font-bold text-base`}>
              <MaterialCommunityIcons name='step-forward' size={15} />
            </Text>
          </Pressable>
        </button>
        <button id='repeatButton' style={tailwind`border-transparent`}>
          <Pressable
            onPress={handleLoopButtonClick}
            style={({ pressed }) => [
              tailwind`bg-[#3F4754] h-12 px-6 items-center justify-center rounded-full`,
              pressed ? tailwind`bg-[#647187]` : null,
            ]}
          >
            <Text style={tailwind`text-white font-bold text-base`}>
              <MaterialCommunityIcons
                name={isLooping ? "repeat-once" : "repeat"}
                size={15}
              />
            </Text>
          </Pressable>
        </button>
      </View>
    </View>
  );
};
