import UserModel from '../../src/models/user'
import AuthService from '../../src/services/auth'
import DepotService from '../../src/services/depot'
import createTest from './create.test'
import listTest from './list.test'
export let tokenDepot = null
export const DEPOT_BASE_URL = '/api/v1/depots'

export const DEPOT = {
    name: 'Depot1',
    depot_number: '11',
    location: {
        city: 'lahore',
        country: 'pakistan',
        state: 'punjab',
        zip_code: '123',
    },
    contact_address: 'Lahore Pakistan',
    contact_info: {
        email: 'email@email.com',
        phone_number: '1231231321',
    },
    depot_permissions: [
        {
            protocol: {
                name: 'protocol Name',
                id: 'Asdsad',
            },

            countries_shipping_to: ['Lahore'],
        },
    ],
}

export default () => {
    before(async () => {
        await DepotService.create(DEPOT)
        await new UserModel({
            contact_info: {
                email: 'testSite@korio.com',
            },
        }).save()
        const { token } = await AuthService.login({
            email: 'testSite@korio.com',
            password: process.env.TEMP_PASSWORD,
        })
        tokenDepot = token
    })
    describe('Depot List', listTest)
    describe('Depot Create', createTest)
}
