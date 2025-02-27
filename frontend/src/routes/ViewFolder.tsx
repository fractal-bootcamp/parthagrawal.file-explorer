import { useEffect, useState } from "react"
import { Table, TableBody, TableDataCell, TableHead, TableHeadCell, TableRow, Window, WindowContent, WindowHeader } from "react95"
import { UploadFile } from "../components/UploadFile"


type ApiFile = {
    Key: string,
    LastModified: string,
    Size: number,
    ETag: string,
    StorageClass: string
    Owner: {
        ID: string
    }
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const ViewFolder = () => {

    const [fileData, setFileData] = useState<FileInfo[]>([])

    const fetchData = async () => {
        const response = await fetch(BACKEND_URL + "/file/all")
        const data = await response.json()
        const parsedData = data.map((file: ApiFile) => ({
            name: file.Key,
            size: file.Size,
            lastModified: new Date(file.LastModified)
        }))
        setFileData(parsedData)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const onUploadComplete = () => {
        fetchData()
    }





    return (
        <div className="flex flex-col h-screen w-screen items-center justify-center gap-3">
            <Window >
                <WindowHeader> Folder on the Ground </WindowHeader>
                <WindowContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Name</TableHeadCell>
                                <TableHeadCell>Size</TableHeadCell>
                                <TableHeadCell>Last Modified</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {fileData.map((file) => (
                                <TableRow key={file.name}>
                                    <TableDataCell>{file.name}</TableDataCell>
                                    <TableDataCell>{file.size}</TableDataCell>
                                    <TableDataCell>{file.lastModified.toString()}</TableDataCell>
                                </TableRow>
                            ))}

                        </TableBody>

                    </Table>

                </WindowContent>

            </Window>
            <UploadFile onUploadComplete={onUploadComplete} />

        </div>
    )
}

type FileInfo = {
    name: string,
    size: number,
    type: string,
    lastModified: Date,
}

