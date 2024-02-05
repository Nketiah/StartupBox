import http from "http"
import "dotenv/config"
import 'colors.ts'
import {app} from './app/app'
const PORT = process.env.PORT || 9000



const server = http.createServer(app)
server.listen(PORT, ()=> console.log(`Server listening on port ${PORT} in ${process.env.NODE_ENV} mode`.cyan.bold))