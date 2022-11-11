import { useEffect, useState } from 'react'
import { Images } from '../images'
import mockData from '../mock/providers.json'
import { ControlType, DynamicFieldData } from '../types/dynamic-control-types'
import {  ProviderMetadata } from '../types/provider'
import { AllProvidersResponse } from '../types/response/allProviders'

export function useAllProviders() : ProviderMetadata[] {
    const [allProvidersData, setAllProvidersData]  = useState<AllProvidersResponse>(Object(mockData))
    const [allProviders, setAllProviders] = useState<ProviderMetadata[]>([])

    useEffect(() => {
        const providers = allProvidersData.providers.map(provider => {
            let integrationKeys: DynamicFieldData[] = provider.config.map(field => {
                return {
                    displayName: field.display_name,
                    fieldName: field.key,
                    inputType: field.type as ControlType,
                    defaultValue: '',
                    config: {
                        required: field.required ? `${field.display_name} is required.` : false
                    }
                }
            })
            
            const data : ProviderMetadata = {
                integrationsKeys: integrationKeys,
                name: provider.display_name,
                key: provider.provider_key,
                channel: provider.channel, 
                logo: Images.Other.TelegramLogo
            }
    
            return data;
        })
        setAllProviders(providers);
    },[allProvidersData])

    return allProviders;
}