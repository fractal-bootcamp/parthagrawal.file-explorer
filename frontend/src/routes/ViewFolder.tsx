import { useEffect, useState } from "react"
import { Table, TableBody, TableDataCell, TableHead, TableHeadCell, TableRow, Window, WindowContent, WindowHeader } from "react95"
import { useTheme } from "styled-components"


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
export const ViewFolder = () => {

    const theme = useTheme();

    const [fileData, setFileData] = useState<FileInfo[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/file/all")
            const data = await response.json()
            const parsedData = data.map((file: ApiFile) => ({
                name: file.Key,
                size: file.Size,
                lastModified: new Date(file.LastModified)
            }))
            setFileData(parsedData)
        }
        fetchData()
    }, [])



    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <Window >
                <WindowHeader> Folder Name </WindowHeader>
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

        </div>
    )
}

type FileInfo = {
    name: string,
    size: number,
    type: string,
    lastModified: Date,
}

