import j2s from 'joi-to-swagger'
import createSiteDTO from './controllers/site/dto/createSite'
import updateSiteDTO from './controllers/site/dto/updateSite'
import updateSiteStatusDTO from './controllers/site/dto/updateSiteStatus'
import updateSitePermissionsDTO from './controllers/site/dto/updateSitePermission'
import loginDTO from './controllers/auth/dto/login'
import createUserDTO from './controllers/user/dto/createUser'
import updateUserDTO from './controllers/user/dto/updateUser'
import updateUserStatusDTO from './controllers/user/dto/updateUserStatus'
import createDepotDTO from './controllers/depot/dto/createDepot'
import updateUserPermissionDTO from './controllers/userPermissions/dto/updateUserPermission'
import updateDepotDetailsDTO from './controllers/depot/dto/updateDepotDetail'
import updateDepotStatusDTO from './controllers/protocolDepot/dto/updateStatus'
import createProtocolDTO from './controllers/protocol/dto/createProtocol'
import updateSitePermissionStatusesDTO from './controllers/site/dto/updateSitePermissionStatuses'

const { swagger: AddProtocolSchema } = j2s(createProtocolDTO)
const { swagger: AddSiteSchema } = j2s(createSiteDTO)
const { swagger: UpdateSiteSchema } = j2s(updateSiteDTO)
const { swagger: UpdateSiteStatusSchema } = j2s(updateSiteStatusDTO)
const { swagger: UpdateSitePermissionsSchema } = j2s(updateSitePermissionsDTO)
const { swagger: UpdateSitePermissionStatusesSchema } = j2s(
    updateSitePermissionStatusesDTO
)
const { swagger: CreateUserSchema } = j2s(createUserDTO)
const { swagger: UpdateUserSchema } = j2s(updateUserDTO)
const { swagger: UpdateUserStatusSchema } = j2s(updateUserStatusDTO)
const { swagger: CreateDepotSchema } = j2s(createDepotDTO)
const { swagger: UpdateDepotDetailsSchema } = j2s(updateDepotDetailsDTO)
const { swagger: UpdateProtocolDepotStatusSchema } = j2s(updateDepotStatusDTO)
const { swagger: LoginUserSchema } = j2s(loginDTO)

const { swagger: UpdateUserPermissionSchema } = j2s(updateUserPermissionDTO)

export {
    AddProtocolSchema,
    AddSiteSchema,
    UpdateSiteSchema,
    UpdateSiteStatusSchema,
    UpdateSitePermissionsSchema,
    UpdateSitePermissionStatusesSchema,
    CreateUserSchema,
    UpdateUserSchema,
    UpdateUserStatusSchema,
    LoginUserSchema,
    CreateDepotSchema,
    UpdateDepotDetailsSchema,
    UpdateUserPermissionSchema,
    UpdateProtocolDepotStatusSchema,
}
