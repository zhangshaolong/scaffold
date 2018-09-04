import {grpc} from 'grpc-web-client'
import Simplite from 'simplite'
import Router from 'tools/router'
import routers from 'configs/router'

import './index.less'

Router.start(routers, document.getElementById('page-root'))