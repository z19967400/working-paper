import React,{Suspense} from 'react'
import {Route, Switch, withRouter } from 'react-router-dom'
import { Home,error } from './pages/index'
import { Routers } from './routers/index'
import { LoadingOutlined } from '@ant-design/icons';
import './App.css'
function App () {
  return (
      <div className="App">
        <Suspense fallback={ 
          <div className="zrn-loading">
              <div className="box">
                <LoadingOutlined className="icon" style={{color:'#e01f3c',fontSize:'50px'}} />
              </div>
          </div>
        }>
          <Switch>
            {
              Routers.map(router => (
                <Route
                  exact={!router.notExect}
                  key={router.path}
                  path={router.path}
                  component={router.component}
                >
                </Route>
              ))
            }
            <Route path="/" component={Home} exact></Route>
            <Route component={error} exact></Route>
          </Switch>
        </Suspense>
      </div>
  )
}

export default withRouter(App)
