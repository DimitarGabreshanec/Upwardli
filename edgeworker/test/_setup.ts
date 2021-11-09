// set up global namespace for worker environment
import * as makeServiceWorkerEnv from 'service-worker-mock'
import * as makeFetchMock from 'service-worker-mock/fetch'
declare var global: any
Object.assign(global, makeServiceWorkerEnv(), makeFetchMock())
