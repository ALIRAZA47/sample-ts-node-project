import { noAuthTest } from './noAuth.test'

export default () => {
    it('Update Site Permission Statuses (without token)', (done) => {
        noAuthTest(
            'put',
            '/api/v1/sites//134sad321546cas/permission-status',
            done
        )
    })
}
