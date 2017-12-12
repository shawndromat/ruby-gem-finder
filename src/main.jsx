import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import RubyGemsClient from "./RubyGemsClient"
import ls from "local-storage"

const client = new RubyGemsClient("http://localhost:3000")

render(<App client={client} storage={ls}/>, document.getElementById('root'))