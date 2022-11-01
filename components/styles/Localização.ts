import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: #34495e;
  border-radius: 4px;
  padding:10px;
  flex:1;
  justify-content:center;
  align-items:center;
`

export const titulo = styled.Text`
font-weight:bold;
font-size: 18px;
align-self:flex-start;
margin-bottom:20px;
`

export const content = styled.View`
  margin-horizontal:20px;
  justify-content:center;
  align-items:center;
  flex:1;
`

export const info = styled.View`
  display:flex;
  flex-direction:row;
  flex:1;
  justify-content:center;
  align-items:center;
  padding-horizontal:5px;
`
