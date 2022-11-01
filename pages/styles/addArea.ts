import styled from 'styled-components/native'

export const container = styled.View`
  flex: 1;
  background-color: #2c3e50;
  padding-top: 80px;
  height:100%;
  align-items: center;
`

export const Saldo = styled.View`
  background-color: #8e44ad;
  padding:15px;
  border-radius:8px;
  margin-bottom:80px;
  width:200px;
  align-items:center;
  justify-content:center;
`

export const inputTitle =styled.TextInput`
  font-size:22px;
  flex:1;
  text-align:center;
`
export const inputPrice = styled(inputTitle)`
  padding-right:10px;
`

export const price = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #34495e;
  padding:25px;
  width:300px;
  margin-bottom:25px;
  border-radius:8px;
`

export const categoria = styled(price)`
  text-align:center;
`

export const icons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px;
  width: 300px;
  margin-top:25px;
  margin-bottom:25px;
  border-radius: 4px;
`

export const icon = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: #34495e;
  align-items:center;
  justify-content:center;
`
export const containerActions = styled(price)`
  justify-content:center;
  background-color:none;
`

export const addButton = styled.TouchableOpacity`
  width: 150px;
  margin-right:25px;
  border-width: 1px;
  border-color: #2ecc71;
  align-items:center;
  justify-content:center;
  padding-vertical:10px;
  padding-horizontal:25px;
  border-radius:30px;
`