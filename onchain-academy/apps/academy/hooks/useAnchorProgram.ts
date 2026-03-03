import { useMemo } from 'react'
import { useConnection, useAnchorWallet } from '@solana/wallet-adapter-react'
import { AnchorProvider } from '@coral-xyz/anchor'
import { getProgram } from '@/libs/anchor/program'

export const useAnchorProgram = () => {
  const { connection } = useConnection()
  const wallet = useAnchorWallet()

  const provider = useMemo(
    () => new AnchorProvider(connection, wallet!, {}),
    [connection, wallet],
  )

  return getProgram(provider)
}
