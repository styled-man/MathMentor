import AWS from "aws-sdk"

// Configure AWS SDK
AWS.config.update({
    region: "us-east-1",
    credentials: new AWS.Credentials("AKIA5BTJAQTG3PKBCVU2", "fa75yKlWN+lXE9lofxXnytYHZUIDcO910M1lfKpF"),
})

const s3 = new AWS.S3()

export interface Response {
    Bucket: string
    ETag: string
    Key: string
    Location: string
}

export const uploadToS3 = async (file: File) => {
    const fileKey = `${Date.now()}-${file.name}`

    // Perform the upload
    return new Promise((resolve, reject) => {
        s3.upload({ Bucket: "math-mentor", Key: fileKey, Body: file }, (error: unknown, data: unknown) => {
            if (error) {
                reject(error)
            } else {
                resolve(data)
            }
        })
    })
}
