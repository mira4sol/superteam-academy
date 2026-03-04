import type { CollectionBeforeChangeHook } from 'payload'

export const normalizeWallet: CollectionBeforeChangeHook = ({ data }) => {
  if (data?.walletAddress) {
    data.walletAddress = data.walletAddress.trim()
  }
  return data
}
