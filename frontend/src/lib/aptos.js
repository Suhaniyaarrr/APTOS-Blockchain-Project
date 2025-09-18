export function getModuleAddress() {
  return import.meta.env.VITE_MODULE_ADDRESS || '0x0'
}

export function buildEntryPayload(functionName, args) {
  const moduleAddress = getModuleAddress()
  return {
    type: 'entry_function_payload',
    function: `${moduleAddress}::automated_savings::${functionName}`,
    type_arguments: [],
    arguments: args,
  }
}


