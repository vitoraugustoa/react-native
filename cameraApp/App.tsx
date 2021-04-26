import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { RNCamera, TakePictureOptions } from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import { launchImageLibrary } from 'react-native-image-picker';

// import { Container } from './styles';

const App: React.FC = () => {
  const [type, setType] = useState(RNCamera.Constants.Type.back);
  const [open, setOpen] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string>("");

  async function takePicture(camera: RNCamera): Promise<void> {
    const options: TakePictureOptions = {
      quality: 0.5,
      base64: true,
    }
    const data = await camera.takePictureAsync(options);

    if (data.uri) {
      setCapturedPhoto(data.uri);
      setOpen(true);
      savePicture(data.uri);
    }
  }

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === "granted";
  }

  async function savePicture(imageBase64: string) {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    CameraRoll.save(imageBase64)
      .then((resp) => {
        console.log("Foto salva com sucesso.")
      })
      .catch((error) => {
        console.log("Erro ao salvar a foto", error);
      });
  }

  function toggleCam(): void {
    setType(type === RNCamera.Constants.Type.back ?
      RNCamera.Constants.Type.front : RNCamera.Constants.Type.back);
  }

  function openAlbum(): void {
    launchImageLibrary({ mediaType: "photo", includeBase64: true }, 
    (response) => {
      if (response.didCancel) {
        console.log("Image Picker cancelado...");
      }
      else if (response.errorMessage) {
        console.log("Gerou o erro: " + response.errorMessage);
      } else {
        setCapturedPhoto(response.uri as string);
        setOpen(true);
      }
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <RNCamera
        style={styles.preview}
        type={type}
        flashMode={RNCamera.Constants.FlashMode.auto}
        androidCameraPermissionOptions={{
          title: "Permissão para usar a camera",
          message: "Nos precisamos usar a sua camera",
          buttonPositive: 'Ok',
          buttonNegative: "Cancelar",
        }}
      >
        {({ camera, status, recordAudioPermissionStatus }) => {
          if (status !== 'READY') return <View />
          return (
            <View style={styles.cameraContainer}>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.btnCamera}>
                <Text>
                  Tirar foto
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={openAlbum}
                style={styles.btnCamera}>
                <Text>
                  Album
                  </Text>
              </TouchableOpacity>
            </View>
          )
        }}
      </RNCamera>

      <View style={styles.camPosition}>
        <TouchableOpacity onPress={toggleCam}>
          <Text>Trocar</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={false} visible={open}>
        <View style={styles.modal}>
          <TouchableOpacity
            onPress={() => setOpen(false)}
            style={styles.btnCamera}>
            <Text>
              Fechar
            </Text>

            <Image
              resizeMode="contain"
              style={styles.photoImage}
              source={{ uri: capturedPhoto }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cameraContainer: {
    marginBottom: 35,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  btnCamera: {
    flex: 0,
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  photoImage: {
    width: 350,
    height: 450,
    borderRadius: 15
  },
  camPosition: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    height: 40,
    position: 'absolute',
    right: 25,
    top: 60,
  }
});

export default App;