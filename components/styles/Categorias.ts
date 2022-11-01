import styled from 'styled-components/native'
type GraphItem = {
  backgroundColor:'string',
  saldo:number,
  itemPrice:number,
  list:number
}
export const AddButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  background-color: #2ecc71;
`

export const containerInfo = styled.View`
  background-color: #2c3e50;
  margin-bottom:10px;
  
`
export const ContainerCategorias = styled.View`
  background-color: #34495e;
  border-radius: 4px;
  padding-vertical: 20px;
  padding-horizontal: 10px;
`
export const ContentCategorias = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const graph = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
  transform: rotate(180deg);
`
export const graphInfo = styled.View(
  (props: GraphItem) => `
  background-color:${props.backgroundColor};
  width:15px;
  display: ${props.itemPrice === 0 ? 'none' : 'flex'}
  height:${props.saldo === 0 ? 0 : (props.itemPrice / props.saldo) * 200}px
`)

export const Dados = styled.TouchableOpacity`
  flex-direction: row;
  width: 200px;
  margin-bottom: 15px;
  align-items: center;
  
`
export const Text = styled.Text`
  text-align:left;
  flex:1;
`
