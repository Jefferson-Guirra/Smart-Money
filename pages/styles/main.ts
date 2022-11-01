import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  height: 100%;
`

export const containerSaldo = styled.View`
  padding:10px
  height:250px;
  background-color:#8e44ad;
  align-items:center;
  justify-content:center;
`

export const TextSaldo = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  margint-bottom: 10px;
`

export const content = styled.View`
  flex: 1;
  background-color: #2c3e50;
  padding: 10px;
`
export const AddButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  background-color: #2ecc71;
`