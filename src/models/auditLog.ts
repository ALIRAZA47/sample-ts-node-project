import { model, Schema } from 'mongoose'
import { IAuditLog } from '../interfaces/auditLog'

const AuditLogSchema = new Schema<IAuditLog>({
    audit_id: { type: String, required: true },
    date: { type: String, required: true },
    environment: { type: String, required: true },
    fields: { type: String, required: true },
    hostname: { type: String },
    level: { type: String },
    log_id: { type: String, required: true },
    log_severity: { type: String, required: true },
    log_type: { type: String, required: true },
    msg: { type: String },
    name: { type: String },
    new_value: { type: String, required: true },
    old_value: { type: String, required: true },
    operation: { type: String, required: true },
    pid: { type: String },
    protocol: { type: String, required: true },
    reason: { type: String, required: true },
    session_id: { type: String, required: true },
    source: { type: String },
    src: { type: Object },
    table: { type: String, required: true },
    time: { type: String },
    user: {
        email: { type: String, required: true },
        id: { type: String },
        name: { type: String, required: true },
    },
    v: { type: String },
})
const AuditLogModel = model<IAuditLog>('audit_log', AuditLogSchema)

export default AuditLogModel
