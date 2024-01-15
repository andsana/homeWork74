import { promises as fs } from 'fs';
import crypto from 'crypto';
import { Message, MessageWithoutId } from './types';

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
    async getMessages(): Promise<Message[]> {
        return data;
    },
    async addMessage(content: string): Promise<Message> {
        const id = crypto.randomUUID();
        const datetime = new Date().toISOString();
        const message: MessageWithoutId = { content, datetime };
        data.push({ id, ...message });
        await this.save();
        return { id, ...message };
    },
    async save() {
        await fs.writeFile(filename, JSON.stringify(data));
    }
};

export default fileDb;
