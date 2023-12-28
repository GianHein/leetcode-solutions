async function getProblemData(problemName) {
  const axios = require("axios");
  const apiUrl = "https://leetcode.com/graphql";

  const queries = [
    {
      name: "questionTitle",
      query: `
                query questionTitle($titleSlug: String!) {
                    question(titleSlug: $titleSlug) {
                        questionId
                        questionFrontendId
                        title
                        difficulty
                    }
                }
            `,
    },
    {
      name: "singleQuestionTopicTags",
      query: `
                query singleQuestionTopicTags($titleSlug: String!) {
                    question(titleSlug: $titleSlug) {
                        topicTags {
                            name
                            slug
                        }
                    }
                }
            `,
    },
    {
      name: "questionContent",
      query: `
                query questionContent($titleSlug: String!) {
                    question(titleSlug: $titleSlug) {
                        content
                        mysqlSchemas
                    }
                }
            `,
    },
  ];

  const variables = {
    titleSlug: problemName,
  };

  let responseData = {};

  for (const query of queries) {
    const response = await axios({
      url: apiUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      data: {
        query: query.query,
        variables,
      },
    });

    responseData[query.name] = response.data;
  }

  return responseData;
}

async function generateSolutionFile(problemName) {
  const problemData = await getProblemData(problemName);

  const marked = require("marked");
  const pageData = {
    id: problemData.questionTitle.data.question.questionId,
    title: problemData.questionTitle.data.question.title,
    difficulty: problemData.questionTitle.data.question.difficulty,
    relatedTopics:
      problemData.singleQuestionTopicTags.data.question.topicTags.map(
        (topic) => topic.name
      ),
    description: marked.parse(
      problemData.questionContent.data.question.content
    ),
  };

  const path = require("path");
  const filePath = path.resolve(
    __dirname,
    `../solutions/${pageData.id}-${problemName}.md`
  );

  const fs = require("fs");

  if (fs.existsSync(filePath)) {
    console.log("File already exists:", filePath);
    return;
  }

  let template = fs.readFileSync(
    path.resolve(__dirname, "./template.md"),
    "utf-8"
  );

  Object.keys(pageData).forEach((key) => {
    template = template.replace(`{{${key}}}`, pageData[key]);
  });

  fs.writeFileSync(filePath, template);

  console.log("File created:", filePath);
}

if (require.main === module) {
  generateSolutionFile(process.argv[2]);
}
