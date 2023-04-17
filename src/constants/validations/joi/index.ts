import defaultCustomMessages from './customMessages.json'

const joiValidateOptions = {
    abortEarly: false,
    alwaysExecuteExternals: true,
    errors: {
        wrap: {
            label: '',
        },
    },
    messages: defaultCustomMessages,
}
export default joiValidateOptions
