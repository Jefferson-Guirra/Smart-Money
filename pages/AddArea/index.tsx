import { Text, TouchableOpacity} from 'react-native'
import * as C from '../styles/addArea'
import {useEffect,useCallback} from  'react'
import { useFocusEffect } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { MaterialIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Data } from '../Main/types'
import * as Location from 'expo-location'
import React from 'react'

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'AddArea'>
export type Cordenadas = {
      latitude: number,
      longitude: number,
      latitudeDelta: number,
      longitudeDelta: number
    }

export const AddArea: React.FC<HomeScreenProps> = props => {
  const [photo, setPhoto] = React.useState<string | undefined>('')
  const [title, setTitle] = React.useState<string | undefined>('')
  const [price, setPrice] = React.useState<number | string>(0)
  const [saldo,setSaldo] = React.useState<number | undefined > (0)
  const [errorMsg,setErrorMsg] = React.useState<string | undefined>()
  const params = props.route.params !== undefined ? props.route.params : null

  useEffect(()=>{
    if(params){
      setTitle(params?.dado?.key)
      setPrice('-' + params?.dado?.price.toString())
    }
  })

  useFocusEffect(
    useCallback(()=>{
      AsyncStorage.getItem('saldo').then(saldoTotal=>{
        if(saldoTotal){
          const regex = /"/g
          const saldoTot = JSON.stringify(saldoTotal).replace(regex, '')
          setSaldo(Number(saldoTot))
        }
      })
    },[])
  )
  const addData = async(data:Data)=>{
    if(data){
      await AsyncStorage.setItem('data',JSON.stringify(data))
    }
  }
  const add = async () => {
    if (title && price) {
      const dado = {
        key: title.toUpperCase(),
        price: typeof price === 'string' ? price.replace('-', '').replace(',','.') : price
      }
      AsyncStorage.getItem('data').then(async (obj)=>{
        const data : Data = JSON.parse(obj || '{}')
        if (data.length) {
          const validate = data?.find(item => item.key === dado.key)
          const newData = data?.map(item => {
            if (item.key === dado.key) {
              item.price = Number(item.price) + Number(dado.price)
              return item
            } else if (!validate && item.key === 'OUTROS') {
              item.price = Number(item.price) + Number(dado.price)
              return item
            } else return item
          })
          addData(newData)
        }
          await AsyncStorage.setItem('item',JSON.stringify(dado))
          props.navigation.push('Main')
        
      })
    }
  }

  const addPrice = (price: number | string) => {
    if (typeof price === 'string' && price.indexOf('-') === -1) {
      setPrice('-' + price)
    } else if (price === '-') {
      setPrice('')
    } else setPrice(price)
  }

  const pickPhoto = async () => {
    const galleryStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (galleryStatus.status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      })

      if (!result.cancelled) {
        setPhoto(result.uri)
      }
    }
  }
  const getLocation = async ()=>{
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return
    }

    let location = await Location.getCurrentPositionAsync({})
    const cordenadas = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
    await AsyncStorage.setItem('cordenadas',JSON.stringify(cordenadas))
    

  }
  const cancel = () => {
    props.navigation.push('Main')
  }
  return (
    <C.container>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>
        Saldo atual
      </Text>
      <C.Saldo>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{saldo}</Text>
      </C.Saldo>
      <C.price>
        <Text style={{ fontSize: 22 }}>$</Text>
        <C.inputPrice
          keyboardType="numeric"
          value={price}
          onChangeText={(newPrice: number) => addPrice(newPrice)}
        ></C.inputPrice>
      </C.price>
      <C.categoria>
        <C.inputTitle
          value={title}
          onChangeText={(newTitle: string) => setTitle(newTitle)}
        ></C.inputTitle>
      </C.categoria>
      <C.icons>
        {!params &&<C.icon style={{ marginRight: 15 }} onPress={pickPhoto}>
          <MaterialIcons name="photo-camera" size={30} color="white" />
        </C.icon>}
        {!params && <C.icon onPress={getLocation}>
          <FontAwesome name="map-marker" size={30} color="white" />
        </C.icon>}
      </C.icons>
      <C.containerActions>
        {!params && <C.addButton onPress={add}>
          <Text style={{ color: '#2ecc71', fontSize: 18 }}>Adicionar</Text>
        </C.addButton>}
        <TouchableOpacity style={{padding:20}} onPress={cancel}>
          <Text style={{ fontSize: 18 }}>{params?'voltar' : 'cancelar'}</Text>
        </TouchableOpacity>
      </C.containerActions>
    </C.container>
  )
}
