export const ViewFolder = () => {


    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="">
                view folder
            </div>
        </div>
    )
}

type FileInfo = {
    name: string,
    size: number,
    type: string,
    lastModified: Date,
}

export const FileRow = ({ file }: { file: FileInfo }) => {
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="text-sm font-medium text-gray-900">{file.name}</div>
            <div className="text-sm text-gray-500">{file.size} bytes</div>
        </div>
    )
}