import list from './list.test'
import create from './create.test'
import UserModel from '../../src/models/user'
import AuthService from '../../src/services/auth'
import Protocol from '../../src/models/protocol'
export let tokenProtocol = null

export default () => {
    before(async () => {
        await new UserModel({
            contact_info: {
                email: 'testProtocol@korio.com',
            },
        }).save()
        const { token } = await AuthService.login({
            email: 'testProtocol@korio.com',
            password: process.env.TEMP_PASSWORD,
        })
        tokenProtocol = token
    })

    describe('Protocol Create', create)
    describe('Protocol List', list)
    after(async () => {
        await Protocol.deleteOne({
            unique_id: 'test-protocol1',
        })
    })
}
