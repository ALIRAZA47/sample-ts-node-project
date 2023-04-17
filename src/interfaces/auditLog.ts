import { DocumentResult } from './documentResult'

export interface IAuditLog extends DocumentResult<IAuditLog> {
    audit_id: string
    date: string
    environment: string
    fields: string
    hostname: string
    level: string
    log_id: string
    log_severity: string
    log_type: string
    msg: string
    name: string
    new_value: string
    old_value: string
    operation: string
    pid: string
    protocol: string
    reason: string
    session_id: string
    source: string
    src: object
    table: string
    time: string
    user: {
        email: string
        id: string
        name: string
    }
    v: string
}
