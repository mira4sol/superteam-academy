import idl from '@/idl/onchain_academy.json'
import { OnchainAcademy } from '@/interfaces/onchain_academy'
import { AnchorProvider, Program } from '@coral-xyz/anchor'

export const getProgram = (provider: AnchorProvider) =>
  new Program<OnchainAcademy>(idl as OnchainAcademy, provider)
