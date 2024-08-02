import { Response } from "express";

export const handleText = (data: Buffer, res: Response) => {
    const textData = data.toString('utf-8');
    res.send(textData);
}

export const handleImage = (data: Buffer, contentType: string, res: Response) => {
    res.set('Content-Type', contentType);
    res.send(data);
}

export const handleUnsupported = (res: Response) => {
    res.status(400).send('Unsupported file type');
}