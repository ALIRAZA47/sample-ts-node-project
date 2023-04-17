import list from './list.test'
import create from './create.test'
import get from './get.test'
import updateSiteDetails from './updateDetails.test'
import updateSitePermissions from './updatePermissions.test'
import deleteSitePermission from './deletePermission.test'
import SiteService from '../../src/services/site'
import UserModel from '../../src/models/user'
import Site from '../../src/models/site'
import User from '../../src/models/user'
import AuthService from '../../src/services/auth'
import ProtocolModel from '../../src/models/protocol'
import Protocol from '../../src/models/protocol'
import updatePermissionStatuses from './updatePermissionStatuses'
export let tokenSite = null
export let siteProtocol1: any = {}
export let siteProtocol2: any = {}
export default () => {
    before(async () => {
        siteProtocol1 = await new ProtocolModel({
            unique_id: 'test-protocol2',
            name: 'test-protocol2',
        }).save()
        siteProtocol2 = await new ProtocolModel({
            unique_id: 'test-protocol12',
            name: 'test-protocol12',
        }).save()
        await SiteService.create({
            number: '6',
            primary_investigator: {
                name: 'ale',
                email: 'ale@gmnil.com',
                phone_number: '12415432523',
            },
            country: 'pk',
            city: 'krc',
            state: 'sndh',
            zip_code: '12800',
            location: 'lhr',
            dts_observed: false,
            timezone: 'GMT+5',
            sponsor: {
                name: 'ali',
            },
            contact_info: {
                email: 'raza@gmail.com',
                phone_number: '12541314435',
                fax_number: '',
            },
            address: {
                line_1: 'korangi rd',
                line_2: 'karanchi',
            },
            drug_delivery_address: {
                line_1: 'korangi rd',
                line_2: 'karanchi',
                line_3: 'ssefs',
            },
            site_permissions: [
                {
                    entity_type: 'protocol',
                    entity_details: {
                        protocol_id: String(siteProtocol1._id),
                        protocol_name: siteProtocol1.name,
                    },
                    enrollment: 'high',
                    screening: '',
                    randomization: '',
                    auto_resupply: '',
                },
            ],
        })
        await new UserModel({
            contact_info: {
                email: 'testSite@korio.com',
            },
        }).save()
        const { token } = await AuthService.login({
            email: 'testSite@korio.com',
            password: process.env.TEMP_PASSWORD,
        })
        tokenSite = token
    })
    describe('Site List', list)
    describe('Create Site', create)
    describe('Get Single Site', get)
    describe('Update Site Details/Profile', updateSiteDetails)
    describe('Update Site Permissions', updateSitePermissions)
    describe('Update Site Permission Statuses', updatePermissionStatuses)
    describe('Delete Site Permission', deleteSitePermission)
    after(async () => {
        await Site.deleteOne({ number: '6' })
        await Protocol.deleteOne({ unique_id: 'test-protocol2' })
        await User.deleteOne({
            contact_info: {
                email: 'testSite@korio.com',
            },
        })
    })
}
