import { logSeverity, logTypes } from '../../constants/types'
import { generateUUID } from './generateUUID'
import { IAuditLog } from '../../interfaces/auditLog'

export const genAuditLog = (logData: IAuditLog) => {
    return {
        audit_id: logData.log_id,
        date: Date.now(),
        environment: logData['environment'],
        fields: logData['fields'],
        hostname: logData['hostname'],
        level: logData['level'],
        log_id: generateUUID(),
        log_severity: logSeverity.INFO,
        log_type: logTypes.AUDIT,
        msg: logData['msg'],
        name: logData['name'],
        new_value: logData['new_value'],
        old_value: logData['old_value'],
        operation: logData['operation'],
        pid: logData['pid'],
        protocol: logData['protocol'],
        reason: logData['reason'],
        session_id: logData['session_id'],
        source: logData['source'],
        src: logData['src'],
        table: logData['table'],
        time: logData['time'],
        user: {
            email: logData['user']['email'],
            id: logData['user']['_id'],
            name: `${logData['user']['name']['first']} ${logData['user']['name']['last']}`,
        },
    }
}
