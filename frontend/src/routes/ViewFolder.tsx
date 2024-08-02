import { Table, TableBody, TableDataCell, TableHead, TableHeadCell, TableRow, Window, WindowContent, WindowHeader } from "react95"

export const ViewFolder = () => {


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
                                <TableHeadCell>Type</TableHeadCell>
                                <TableHeadCell>Last Modified</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableDataCell>File Name</TableDataCell>
                                <TableDataCell>File Size</TableDataCell>
                                <TableDataCell>File Type</TableDataCell>
                                <TableDataCell>Last Modified</TableDataCell>
                            </TableRow>
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

