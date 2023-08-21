import { Pressable, View, Text, Image, ImageBackground } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tailwind from "twrnc";
import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

export const AudioScreen = ({
  selectedSong,
  selectedName,
  selectedImage,
}: {
  selectedSong: string;
  selectedName: string;
  selectedImage: string;
}) => {
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
  const bgColor = "#141124";
  const playButtonColor = isPlaying ? "#fff" : bgColor;

  return (
    <ImageBackground
      source={{
        uri: selectedImage,
      }}
      style={tailwind`flex-1`}
      imageStyle={tailwind`absolute inset-0 m-0 p-0`}
      resizeMode='cover'
      blurRadius={40}
    >
      <View style={tailwind`flex-1 `}>
        <View
          style={tailwind`flex flex-wrap justify-center items-center mt-10 p-5`}
        >
          <Image
            source={{
              uri: selectedImage,
            }}
            style={tailwind`w-full h-64 rounded-md`}
          />
          <Text style={tailwind`mt-2 text-center text-xl font-bold text-white`}>
            {selectedName}
          </Text>
        </View>
        <View style={tailwind`justify-center items-center `}>
          <ReactPlayer
            ref={playerRef}
            url={selectedSong}
            controls={false}
            playing={isPlaying}
            loop={isLooping}
            width='100%'
            height='70%'
            onProgress={(progress) => {
              setSeekTime(progress.playedSeconds);
            }}
          />
        </View>
        <View style={tailwind`flex flex-row justify-center items-center`}>
          <Text style={tailwind`text-white`}>{formatTime(seekTime)}</Text>
          <input
            type='range'
            style={tailwind`w-1/2`}
            value={seekTime}
            min={0}
            max={playerRef.current ? playerRef.current.getDuration() : 0}
            step={0.0}
            onChange={(e) => handleSeekChange(parseFloat(e.target.value))}
          />
          <Text style={tailwind`text-white`}>
            {playerRef.current && formatTime(playerRef.current.getDuration())}
          </Text>
        </View>
        <View style={tailwind`flex flex-row justify-center items-center`}>
          <Pressable
            id='shuffleButton'
            style={tailwind`border-transparent text-white rounded-full overflow-hidden px-6`}
          >
            <MaterialCommunityIcons name='shuffle' size={25} color='white' />
          </Pressable>
          <Pressable
            id='backwardButton'
            style={tailwind`border-transparent text-white rounded-full overflow-hidden px-6`}
            onPress={handleBackwardButtonClick}
          >
            <MaterialCommunityIcons
              name='step-backward'
              size={25}
              color='white'
            />
          </Pressable>
          <Pressable
            id='playButton'
            style={tailwind`border-transparent rounded-full bg-white overflow-hidden`}
            onPress={handlePlayButtonClick}
          >
            <MaterialCommunityIcons
              name={isPlaying ? "pause" : "play"}
              size={37}
              style={tailwind`items-center justify-center`}
            />
          </Pressable>
          <Pressable
            id='forwardButton'
            style={tailwind`border-transparent text-white rounded-full overflow-hidden px-6`}
            onPress={handleForwardButtonClick}
          >
            <MaterialCommunityIcons
              name='step-forward'
              size={25}
              color='white'
            />
          </Pressable>
          <Pressable
            id='repeatButton'
            style={tailwind`border-transparent text-white rounded-full overflow-hidden px-6`}
            onPress={handleLoopButtonClick}
          >
            <MaterialCommunityIcons
              name={isLooping ? "repeat-once" : "repeat"}
              size={25}
              color={isLooping ? "green" : "white"}
            />
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};
