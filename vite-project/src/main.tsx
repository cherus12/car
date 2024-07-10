import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Auth0Provider
		domain='dev-252fizaruca6k8so.eu.auth0.com'
		clientId='NaVBEY3bmKpC5gz16BeEgCAyHxnD9rBX'
		authorizationParams={{
			redirect_uri: window.location.origin,
		}}
	>
		<Provider store={store}>
			<App></App>
		</Provider>
	</Auth0Provider>
)
