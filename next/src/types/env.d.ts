declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BACKEND_PORT: string
            NEXT_PORT: string
            AZURE_ACCOUNT_NAME: string
            AZURE_ACCOUNT_KEY: string
            AZURE_CONTAINER_NAME: string
            MATHPIX_APP_ID: string
            MATHPIX_APP_KEY: string
        }
    }
}

export {}
