/**
 * Kundendaten registrieren.
 * Scraper und KI-Agent lesen von hier — Demo-Sites nutzen dieselben Daten.
 */

import type { ClientData } from './types'
import { fischerHaus } from './fischer-haus'
import { muellerReinigung } from './mueller-reinigung'
import { schmidtMaler } from './schmidt-maler'
import { weberGarten } from './weber-garten'

export const CLIENT_DATA: ClientData[] = [
  muellerReinigung,
  weberGarten,
  schmidtMaler,
  fischerHaus,
]
