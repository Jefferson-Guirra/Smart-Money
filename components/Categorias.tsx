import { View, Text, FlatList } from 'react-native'
import * as C from './styles/Categorias'
import { Data } from '../pages/Main/types'
import {Dado} from '../App'

type Props = {
  data: Data | undefined,
  saldo:number,
  handleDataItem: (item:Dado)=>void
}


const Categorias = ({data,saldo,handleDataItem}:Props) => {

  const navigationItem = (key:string,price:number)=>{
    const dado = {
      key:key,
      price:price
    }
    handleDataItem(dado)
  }
  return (
    <C.containerInfo>
      <C.ContainerCategorias>
        <C.ContentCategorias>
          <C.graph>
            <View style={{ flexDirection: 'row' }}>
              {data && data?.map(item => (
                <C.graphInfo
                  key={item.key}
                  backgroundColor={item.backgroundColor}
                  saldo={saldo}
                  list={data.length}
                  itemPrice={item.price}
                ></C.graphInfo>
              ))}
            </View>
          </C.graph>
          <View>
            <FlatList
              data={data}
              keyExtractor={item => item.key}
              renderItem={({ item }) => (
                <C.Dados onPress={()=>navigationItem(item.key,item.price)}>
                  <View
                    style={{
                      backgroundColor: item.backgroundColor,
                      width: 18,
                      height: 18,
                      borderWidth: 2,
                      marginRight: 5,
                      borderColor: '#2c3e50',
                      borderRadius: 20
                    }}
                  ></View>
                  <C.Text>{item.key}</C.Text>
                  <Text>${item.price}</Text>
                </C.Dados>
              )}
            />
          </View>
        </C.ContentCategorias>
      </C.ContainerCategorias>
    </C.containerInfo>
  )
}

export default Categorias
