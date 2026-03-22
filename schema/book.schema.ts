export const bookSchema = {
    type: "object",
    required: ["id", "title", "author"],
    properties: {
        id: { type: "number" },
        title: { type: "string" },
        author: { type: "string" },
        genre: { type: "string" },
        publishedYear: { type: "number" },
        description: { type: "string" },
        isbn: { type: "string" },
        pages: { type: "number" },
        rating: { type: "number" }
    },
    additionalProperties: false
};