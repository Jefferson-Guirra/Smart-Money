import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { Main } from './pages/Main'
import { AddArea } from './pages/AddArea'

export type Dado = {
  key: string, 
  price:number | string
}
export type RootStackParamList = {
  Main:{dado:Dado} | undefined
  AddArea: {dado:Dado} | undefined
}
const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="AddArea" component={AddArea} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
