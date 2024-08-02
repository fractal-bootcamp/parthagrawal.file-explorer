import { useState } from "react";
import { Button, TextInput, Window, WindowContent, WindowHeader } from "react95";

export const UploadFile = ({ onUploadComplete }: { onUploadComplete: () => void }) => {
    const [uploadModalVisible, setUploadModalVisible] = useState(false);


    return (
        <div>
            {!uploadModalVisible &&
                <Button onClick={() => setUploadModalVisible(true)}>
                    Upload File
                </Button>
            }

            {uploadModalVisible && <UploadModal toggleModal={setUploadModalVisible} onUploadComplete={onUploadComplete} />}


        </div>
    )

}


const UploadModal = ({ toggleModal, onUploadComplete }: { toggleModal: React.Dispatch<React.SetStateAction<boolean>>, onUploadComplete: () => void }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setFile(file);
    };

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:3000/file/new", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("File uploaded successfully!");
                toggleModal(false);
                onUploadComplete();

            } else {
                alert("File upload failed.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("An error occurred during file upload.");
        }
    };

    return (
        <Window>
            <WindowHeader>Upload File</WindowHeader>
            <WindowContent>
                <TextInput type="file" onChange={handleFileChange} />
                <Button onClick={handleUpload}>Upload</Button>
            </WindowContent>
        </Window>
    );
};



export default UploadFile;