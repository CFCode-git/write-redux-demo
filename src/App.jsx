import React, {useState, useContext, useEffect} from 'react'

const store = {
  state: {
    user: {name: 'frank', age: 18}
  },
  setState(newState) {
    store.state = newState
    store.listeners.map(fn => fn(store.state))
  },
  listeners: [],
  subscribe(fn) {
    store.listeners.push(fn)
    return () => {
      const index = store.listeners.indexOf(fn)
      store.listeners.splice(index, 1)
    }
  }
}

const connect = (Component) => {
  return (props) => {
    const {state, setState} = useContext(appContext)
    const [, update] = useState({})
    // 初次挂载 添加订阅 执行 setState(update)
    useEffect(() => {
      store.subscribe(() => {
        update({})
      })
    }, [])
    const dispatch = (action) => {
      setState(reducer(state, action))
    }
    return <Component {...props} dispatch={dispatch} state={state}/>
  }
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

const appContext = React.createContext(null)
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
const 幺儿子 = () =>{
  console.log('幺儿子执行了',Math.random())
  return <section>幺儿子</section>
}

const User = connect(({state,dispatch}) => {
  console.log('User 执行了', Math.random())
  return <div>User:{state.user.name}</div>
})

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
