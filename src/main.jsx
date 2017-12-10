import React from 'react'
import { render } from 'react-dom'
import App from './App'
import RubyGemsClient from "./RubyGemsClient"

const client = new RubyGemsClient("http://localhost:3000")

render(<App client={client}/>, document.getElementById('root'))