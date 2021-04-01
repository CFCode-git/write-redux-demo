// 请从课程简介里下载本代码
import React, {useState, useContext} from 'react'

const appContext = React.createContext(null)

export const App = () => {
  const [appState, setAppState] = useState({
    user: {name: 'frank', age: 18}
  })
  const contextValue = {appState, setAppState}
  return (
    <appContext.Provider value={contextValue}>
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
  console.log('二儿子执行了',Math.random())
  return <section>二儿子<UserModifier>aaa</UserModifier></section>
}
const 幺儿子 = () =>{
  console.log('幺儿子执行了',Math.random())
  return <section>幺儿子</section>
}

const User = () => {
  console.log('User 执行了',Math.random())
  const contextValue = useContext(appContext)
  return <div>User:{contextValue.appState.user.name}</div>
}

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

const connect = (Component) => {
  return (props) => {
    const {appState, setAppState} = useContext(appContext)
    const dispatch = (action)=>{
      setAppState(reducer(appState, action))
    }
    return <Component {...props} dispatch={dispatch} state={appState} />
  }
}


const UserModifier = connect(({dispatch,state,children}) => {
  console.log('UserModifier 执行了',Math.random())
  const onChange = (e) => {
    dispatch({type: 'updateUser', payload: {name: e.target.value}})
  }
  return <div>
    {children}
    <input value={state.user.name}
           onChange={onChange}/>
  </div>
})
