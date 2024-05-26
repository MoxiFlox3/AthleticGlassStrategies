// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { Octokit } = require("@octokit/rest");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

app.post('/upload', async (req, res) => {
    const { fileContent } = req.body;
    try {
        await octokit.actions.createWorkflowDispatch({
            owner: 'moxiflox3',
            repo: 'AthleticGlassStrategies',
            workflow_id: 'upload.yml',
            ref: 'main',
            inputs: { FILE_CONTENT: fileContent }
        });
        res.status(200).send('File uploaded and committed to GitHub!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading file to GitHub');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
