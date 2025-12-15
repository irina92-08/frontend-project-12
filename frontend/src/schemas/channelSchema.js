import * as yup from 'yup'

export const channelSchema = (t, channelId, dataChannels,statusModal) => yup.object().shape({
  name: yup
    .string()
    .min(3, t('modal.symbols'))
    .max(20, t('modal.symbols'))
    .required(t('modal.require'))
    .test('unique-name', t('modal.unique'), function (value) {
      const dataNames = dataChannels.channels
        .filter((channel) => {
          if (statusModal === 'rename' && channelId) {
            return channel.id !== channelId
          }
          return true
        })
        .map(channel => channel.name)

      return !dataNames.includes(value)
    }),
})
