export interface ResponseTypeMap {
    JSON: any,
    ARRAY_BUFFER: ArrayBuffer,
    BLOB: Blob,
    FORM_DATA: FormData,
    TEXT: string
}

export async function responseManager<K extends keyof ResponseTypeMap>(
    response: Response,
    expectedResponseType: K,
    expectedExceptionResponseType: keyof ResponseTypeMap
): Promise<ResponseTypeMap[K]> {

    if (response.ok) {
        return await getResponseByType(expectedResponseType);
    } else {
        const error: ResponseTypeMap[K] = await getResponseByType(expectedExceptionResponseType);
        throw new Error("Error: " + response.status + "\t" + error)
    }


    async function getResponseByType<K extends keyof ResponseTypeMap>(
        expectedExceptionResponseTypeBody: K
    ): Promise<ResponseTypeMap[K]> {
        switch (expectedExceptionResponseTypeBody) {
            case "ARRAY_BUFFER":
                return await response.arrayBuffer();
            case "BLOB":
                return await response.blob();
            case "FORM_DATA":
                return await response.formData();
            case "JSON":
                return await response.json();
            case "TEXT":
                return await response.text();
        }
    }
}