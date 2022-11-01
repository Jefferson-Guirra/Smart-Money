import { Text,View } from 'react-native'
import * as C from '../styles/main'
import { Ionicons } from '@expo/vector-icons'
import Categorias from '../../components/Categorias'
import Localização from '../../components/Localizaçao'
import { useFocusEffect } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useCallback,useState,useEffect} from 'react'
import { Data } from './types'
import { Dado } from '../../App'

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>

export  const Main: React.FC<HomeScreenProps> = (props) => {
  const [saldo,setSaldo] = useState<number>(0)
  const [data, setData] = useState<Data | undefined>()
  const initialData =[
    { key: 'ALIMENTAÇÃO', price: 0, backgroundColor: '#27ae60' },
    { key: 'ALUGUEL', price: 0, backgroundColor: '#e67e22' },
    { key: 'COMBUSTÍVEL', price: 0, backgroundColor: '#2980b9' },
    { key: 'LAZER', price: 0, backgroundColor: 'red' },
    { key: 'OUTROS', price: 0, backgroundColor: '#8e44ad' }
  ]
  const validate = ()=>{
    let trueOrFalse = false
    AsyncStorage.getItem('data').then(data=>{
      const list = JSON.parse(data || '{}')
      list[0] ? trueOrFalse = true : trueOrFalse = false
    })
    return trueOrFalse
  }
  const addInitialData = async ()=>{
    await AsyncStorage.setItem('data', JSON.stringify(initialData))
  }
  const handleDataItem = (item :Dado )=>{
    props.navigation.navigate('AddArea',{
      dado:item,
    })
  }
  useEffect(() => {
    validate() ? addInitialData() : ''
    /*AsyncStorage.removeItem('item')*/
  }, [])
  type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>
    useFocusEffect(
      useCallback(()=>{
        AsyncStorage.getItem('data').then( async (obj)=>{
          const list:Data = JSON.parse(obj || '{}')
          if(list.length){
            const saldo = list.reduce(
              (acc, valor) => acc + valor.price,
              0
            )
            await AsyncStorage.setItem('saldo','' + saldo)
            setSaldo(saldo)
            setData(list)
          }

        })
        
      },[])
    )
  

  const addEntry = ()=>{
    props.navigation.push('AddArea')
  }
  return (
    <C.Container>
      <C.containerSaldo>
        <C.TextSaldo>SALDO ATUAL</C.TextSaldo>
        <Text style={{ fontSize: 45, marginTop: 10, marginBottom: 10 }}>
          {saldo}
        </Text>
      </C.containerSaldo>
      <C.content>
        <View
          style={{
            alignSelf: 'flex-end',
            position: 'absolute',
            top: '-5%',
            zIndex: 3,
            left: '88%'
          }}
        >
          <C.AddButton onPress={addEntry}>
            <Ionicons name="add" size={30} color="black" />
          </C.AddButton>
        </View>
        <Categorias data={data?.length ? data : initialData} saldo={saldo} handleDataItem={handleDataItem} />
        <Localização initialData = {initialData} />
      </C.content>
    </C.Container>
  )
}
