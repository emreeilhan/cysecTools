// Purpose: Compose tools from category modules
// TODO: Populate remaining categories
// Purpose: Compose tools from category modules
// TODO: Populate remaining categories
import { NETWORK_TOOLS } from './network'
import { IDS_IPS_TOOLS } from './ids_ips'
import { WINDOWS_TOOLS } from './windows'
import { RULES_DETECTION_TOOLS } from './rules_detection'
import { MALWARE_DFIR_TOOLS } from './malware_dfir'
import { UTILITY_TOOLS } from './utilities'
import { WEB_SECURITY_TOOLS } from './web_security'
import { ATTACK_TOOLS } from './attack_tools'

export const TOOLS = [
  ...NETWORK_TOOLS,
  ...IDS_IPS_TOOLS,
  ...WINDOWS_TOOLS,
  ...RULES_DETECTION_TOOLS,
  ...MALWARE_DFIR_TOOLS,
  ...UTILITY_TOOLS,
  ...WEB_SECURITY_TOOLS,
  ...ATTACK_TOOLS,
]


