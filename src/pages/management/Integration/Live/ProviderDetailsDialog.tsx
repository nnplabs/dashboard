import React from 'react'
import { ProviderData } from '../../../../types/api/provider';
import { IntegrationFormHeader } from '../All/ProviderForm';

function ProviderDetailsDialog({
    provider,
    onCloseHandler,
  }: {
    provider: ProviderData
    onCloseHandler: () => void
    }) {
  return (
    <div className={"w-[600px] flex flex-col overflow-y-scroll"}>
        <IntegrationFormHeader
          providerName={provider.name}
          onCloseHandler={onCloseHandler}
        />
        <div className="flex flex-col h-full w-full p-7 gap-4">
            {
                Object.entries(provider.config ?? {}).map(([key, value]) => {
                    return (
                        <div className="flex flex-col gap-2 my-2">
                            <div className="text-gray-700 text font-medium">{key}:</div>
                            <div className="text-gray-500 text overflow-clip">{value}</div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
export default ProviderDetailsDialog
