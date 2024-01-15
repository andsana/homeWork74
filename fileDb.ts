import { promises as fs } from 'fs';
import crypto from 'crypto';
import {Message} from "./types";

const filename = './db.json';
let data: Message[] = [];

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(filename);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },
    async getMessages() {
        return data;
    },
    async addMessage(content: string) {
        const id = crypto.randomUUID();
        const message: Message = { id, content };
        data.push(message);
        await this.save();
        return message;
    },
    async save() {
        await fs.writeFile(filename, JSON.stringify(data));
    }
};

export default fileDb;

