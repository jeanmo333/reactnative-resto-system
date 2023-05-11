/** @format */

import * as ImagePicker from "expo-image-picker";

export const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  } else {
    return;
  }
};

export const takePhoto = async () => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  } else {
    return;
  }
};
