import {Server} from "socket.io";
import ActionService from "../../../services/ActionService";

export default function handler(req, res) {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server, {
            path: "/api/socket_io",
            addTrailingSlash: false
        })

        res.socket.server.io = io

        io.on('connection', async socket => {
            socket.onAny((eventName, args) => {
                console.log(`[SERVER] [${eventName}]`, args)
            })

            for (let i = 0; i < 3; i++) {
                const action = ActionService.fetchAction()

                socket.emit('update', {
                    user: action.user,
                    action: action.action,
                    preposition: action.values?.preposition,
                    value: action.values?.value,
                    timestamp: new Date()
                })
            }

            setInterval(() => {
                if (Math.random() < 0.5) return
                const action = ActionService.fetchAction()

                socket.emit('update', {
                    user: action.user,
                    action: action.action,
                    preposition: action.values?.preposition,
                    value: action.values?.value,
                    timestamp: new Date()
                })
            }, 5000)
        })
    }

    res.end()
}
