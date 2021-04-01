import React from 'react'
import {appContext, createStore, connect} from './redux.jsx'
import {connectToUser} from './connecters/connectToUser'

const reducer = (state, {type, payload}) => {
  if (type === 'updateUser') {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    }
  } else {
    return state
  }
}
const initState = {
  user: {name: 'frank', age: 18},
  group: {name: '前端组'}
}
const store = createStore(reducer, initState)

export const App = () => {
  return (
    <appContext.Provider value={store}>
      <大儿子/>
      <二儿子/>
      <幺儿子/>
    </appContext.Provider>
  )
}
const 大儿子 = () => {
  console.log('大儿子执行了',Math.random())
  return <section>大儿子<User/></section>
}
const 二儿子 = () => {
  console.log('二儿子执行了', Math.random())
  return <section>
    二儿子
    <UserModifier>aaa</UserModifier>
  </section>
}
const 幺儿子 = connect(state=>{
  return {group:state.group}
})(({group}) =>{
  console.log('幺儿子执行了',Math.random())
  return <section>幺儿子<div>Group: {group.name}</div></section>
})

const User = connectToUser(({user}) => {
  console.log('User 执行了', Math.random())
  return <div>User:{user.name}</div>
})

const UserModifier = connectToUser(({updateUser, user, children}) => {
  console.log('UserModifier 执行了', Math.random())
  const onChange = (e) => {
    updateUser({name: e.target.value})
  }
  return <div>
    {children}
    <input value={user.name}
           onChange={onChange}/>
  </div>
})
