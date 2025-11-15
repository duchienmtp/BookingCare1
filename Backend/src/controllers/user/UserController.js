import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CreateNewChat = async (req, res) => {
    try {
        const { message } = req.body;
        console.log("message: ", message);
        if (!message) {
            return res.status(400).json({ error: "Missing message" });
        }

        // Path to multi-agent script
        const pythonScriptPath = resolve(__dirname, '../../../../SQLAgent/src/multi_agent_graph.py');
        const pythonPath = resolve(__dirname, '../../../../SQLAgent/venv/Scripts/python.exe');

        const pythonProcess = spawn(pythonPath, [pythonScriptPath, message], {
            cwd: resolve(__dirname, '../../../../SQLAgent'),
            env: { ...process.env, PYTHONIOENCODING: 'utf-8' }
        });

        let output = '';
        let error = '';

        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            error += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                return res.status(500).json({ error: `Python script error: ${error}` });
            }
            let result = output.trim();
            const idx = result.lastIndexOf("Response:");
            if (idx !== -1) {
                result = result.substring(idx + 9).trim(); // 9 = length of "Response:"
            }
            return res.status(200).json({ reply: result });
        });
    } catch (error) {
        console.error("Error in UserController.CreateNewChat: ", error);
        return res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};


export default {
    CreateNewChat,
};
