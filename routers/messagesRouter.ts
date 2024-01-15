import {Router} from "express";
import {promises as fs} from "fs";

const messagesRouter = Router();
const messagesPath = './messages';

messagesRouter.post("/", async (req, res) => {
    try {
        const message = req.body.content;
        const datetime = new Date().toISOString();
        const fileName = `${messagesPath}/${datetime}.txt`;

        await fs.writeFile(fileName, message);

        res.json({ message, datetime });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

messagesRouter.get("/", async (req, res) => {
    try {
        const files = await fs.readdir(messagesPath);
        const latestFiles = files
            .sort((a, b) => b.localeCompare(a))
            .slice(0, 5);

        const messages = await Promise.all(
            latestFiles.map(async (file) => {
                const filePath = `${messagesPath}/${file}`;
                const fileContents = await fs.readFile(filePath, "utf-8");
                const datetime = file.replace(".txt", "");
                return { message: fileContents, datetime };
            })
        );

        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default messagesRouter;
