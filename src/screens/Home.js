import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
//constant
import {Height, Width} from '../constants/dimension';

//third-party-packages
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import ImagePicker from 'react-native-image-crop-picker';

const Home = ({navigation}) => {
  //state
  const [image, setImage] = useState('');
  const [imageSelected, setImageSelected] = useState(false);

  const [imageCapture, setImageCapture] = useState('');
  const [isImageCaptured, setIsImageCaptured] = useState(false);

  //camera-access
  const camera = useRef(null);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  //imagePicker - Function
  const pickFromGallery = () => {
    ImagePicker.openPicker({
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage({
        uri: image.path,
        mine: image.mime,
      });
      setImageSelected(true);
    });
  };

  //capture image
  function takePhoto() {
    // camera.current
    //   .takePhoto({
    //     flash: 'on',
    //   })
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImageCapture({uri: image.path});
      setIsImageCaptured(true);
    });
  }
  console.log(imageCapture);

  if (device == null) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <Text style={{color: '#000000'}}>Home</Text>
      <View style={{height: Height / 2, width: '100%'}}>
        <Camera
          ref={camera}
          zoom={1}
          style={styles.camera}
          device={device}
          isActive={true}
          photo={true}
        />
        {imageSelected && (
          <Image
            resizeMode="center"
            source={{uri: image.uri}}
            style={styles.image}
          />
        )}
      </View>

      {isImageCaptured && (
        <View style={{backgroundColor: 'red', width: '100%'}}>
          <Image
            resizeMode="center"
            source={{uri: imageCapture.uri}}
            // source={{uri: 'https://pixabay.com/images/search/nature/'}}
            style={{height: Height / 12, width: Width / 4}}
          />
          <Text style={{color: '#000000'}}>{'Image captured'}</Text>
        </View>
      )}

      {/* Buttons */}
      <View
        style={{
          flexDirection: 'row',
          // backgroundColor: 'red',
          width: '100%',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity onPress={pickFromGallery} style={styles.button}>
          <Text>{'Upload image'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePhoto} style={styles.button}>
          <Text>{'Capture'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8,
  },
  camera: {height: '100%', width: '100%'},
  image: {
    height: Height / 12,
    width: Width / 4,
    position: 'absolute',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 8,
    height: Height / 16,
    width: Width / 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
});
