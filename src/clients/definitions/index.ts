/**
 * Register all customers here.
 * To add a new customer: create a file in this folder, then add one line below.
 */

import type { ClientDefinition } from '../types'
import { fischerHaus } from './fischer-haus'
import { muellerReinigung } from './mueller-reinigung'
import { schmidtMaler } from './schmidt-maler'
import { weberGarten } from './weber-garten'

export const CLIENT_DEFINITIONS: ClientDefinition[] = [
  muellerReinigung,
  weberGarten,
  schmidtMaler,
  fischerHaus,
]
