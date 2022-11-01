import { View, Text} from 'react-native'
import * as C from './styles/Localização'
import { useState, useEffect } from 'react'
import MapView from 'react-native-maps'
import { Data } from '../pages/Main/types'
import {Cordenadas} from '../pages/AddArea/index'
import AsyncStorage from '@react-native-async-storage/async-storage'
type Item = {
  key: string
  price: number | string
}
type Props = {
  initialData: Data
}
const Localização = ({ initialData }: Props) => {
  const [item, setItem] = useState<Item | undefined>()
  const [regiao, setRegiao] = useState<Cordenadas | undefined>()
  const validate = initialData.find(obj => obj.key === item?.key)
  const getLocation = async () => {
    AsyncStorage.getItem('item').then(obj => {
      const itemInfo: Item = JSON.parse(obj || '{}')
      setItem(itemInfo)
    })
    AsyncStorage.getItem('cordenadas').then(obj => {
      if (obj) {
        let cordenadas = JSON.parse(obj)
        setRegiao(cordenadas)
      }
    })
  }
  useEffect(() => {
    getLocation()
  }, [])

  return (
    <C.Container>
      <C.titulo>Último Lançamento</C.titulo>
      <C.content>
        {item?.key && <C.info>
          <View
            style={{
              backgroundColor: `${
                !validate ? '#8e44ad' : validate?.backgroundColor
              }`,
              width: 18,
              height: 18,
              borderWidth: 2,
              marginRight: 5,
              borderColor: '#2c3e50',
              borderRadius: 20
            }}
          ></View>
            <Text style={{ flex: 1 }}>
              {validate === undefined ? 'OUTROS' : item.key}
            </Text>
          
          <Text>${item.price}</Text>
        </C.info>}
        {regiao?.latitude && (
          <MapView
            style={{ width: 300, height: 200 }}
            region={regiao}
          ></MapView>
        )}
      </C.content>
    </C.Container>
  )
}

export default Localização
