export interface Message {
    id: string;
    content: string;
    datetime: string;
}

export type MessageWithoutId = Omit<Message, 'id'>;

