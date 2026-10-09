import express from "express"
import cors from "cors";

const app = express()

app.use(express.json());
app.use(cors())

interface Issue {
    id: number,
    title: string,
    section: string
}
const ISSUES: Issue[] = [{
    id: 1,
    title: "Fix G",
    section: "done"
},{
    id: 1,
    title: "Fix A",
    section: "todo"
}]

app.post('/issue', (req, res) => {
    const { title, section } = req.body;
    ISSUES.push({
        title, section, id: Math.random()
    })
})

app.get('/issues', (req, res) => {
    res.json({
        issues: ISSUES
    })
})

app.post('/move', (req, res) => {
    const { issueId, newSection } = req.body;

    const issue = ISSUES.find(i => i.id == issueId)

    if (issue) {
        issue.section = newSection;
        res.json({
            message: "Done"
        })
    } else {
        res.status(411).json({
            message: "Issue Not found"
        })
    }

})

app.listen(3001);