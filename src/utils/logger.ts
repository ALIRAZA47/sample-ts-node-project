import bunyan from 'bunyan'
import CustomException from './global/customException'

// splunkStream.setEventFormatter(function (message, severity) {
//     let event = '[' + severity + ']'
//
//     if (typeof message === 'object') {
//         for (let key in message) {
//             event += key + '=' + message[key] + ' '
//         }
//     } else {
//         event += 'message=' + message
//     }
//
//     return event
// })
const errSerializer = (err) => {
    if (err instanceof CustomException) {
        return {
            statusCode: err.statusCode,
            message: err.message,
            stack: err.stack,
        }
    }
    return err
}

// Setup Bunyan, adding splunkStream to the array of streams
let Logger = bunyan.createLogger({
    name: 'UM-Node-App-Logger',
    streams: [
        {
            level: 'info',
            path: `${process.env.LOGS_PATH}/logs`,
        },
    ],
    serializers: {
        req: bunyan.stdSerializers.req,
        res: bunyan.stdSerializers.res,
        err: errSerializer,
    },
    hostname: 'localhost',
    source: 'UM-Node-App',
    src: true,
})

export default Logger
