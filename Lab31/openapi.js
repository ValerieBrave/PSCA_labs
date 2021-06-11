let openapi = {
    openapi:"3.0.1",
    info:{
        version: "1.0.0",
        title: "Records",
        description: "Phone dictionary API",
        termsOfService: "http://api_url/terms",
        contact: {
            name: "SVV",
            email: "valeriebrave00@gmail.com",
            url: "http://api_url/contact",
        },
        license: {
            name: "Apache 2.0",
            url: "https://www.apache.org/licenses/LICENSE-2.0.html",
        }
    },
    servers:[
        {
            url: "http://localhost:{port}",
            description: "Development server",
            variables: { port: { default: 3000 } },
        },
        {
            url: "http://api/testing:{port}",
            description: "Staging server",
            variables: { port: { enum: [448, 8443], default: 8443 } },
        },
        { url: "http://api/records.by", description: "Production server" }
    ],
    paths: {
        "/TS": {
            get: {
                tags: ["CRUD operations"],
                description: "Get contacts",
                operationId: "GetContacts",
                responses: {
                    "200": {
                        description: "List of telephones",
                        content: {
                            "application/json": {
                                schema: { type: "array", items: { type: "object" } },
                                example: [
                                    {ID: 1, Name: "Elizabeth 2nd", Telephone: "332-9844-33"},
                                    {ID: 2, Name: "Prince Charles", Telephone: "832-9454-30"}
                                ]
                            }
                        }
                    },
                    "204": {
                        description: "Empty list of telephones",
                    }
                }
            },
            post: {
                tags: ["CRUD operations"],
                description: "Add contact",
                operationId: "AddContact",
                requestBody: {
                    content: {
                        "application/json": {
                            name: "Contact info",
                            schema: { type: "object" },
                            required: true,
                            description: "New contact info",
                            example: {ID: 1, Name: "Elizabeth 2nd", Telephone: "332-9844-33"}
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "Contact added",
                        content: {
                            "application/json": {
                                schema: { type: "object"},
                                example: {ID: 1, Name: "Elizabeth 2nd", Telephone: "332-9844-33"}
                            }
                        }
                    },
                    "409": {
                        description: "Contact duplication",
                    }
                }
            },
            put: {
                tags: ["CRUD operations"],
                description: "Edit contact",
                operationId: "EditContact",
                parameters: [
                    {
                      name: "id",
                      in: "header",
                      required: true,
                      description: "Contact ID to edit",
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            name: "Contact info",
                            schema: { type: "object" },
                            required: true,
                            description: "Contact info to edit",
                            example: {Name: "Elizabeth 2nd", Telephone: "111-1111-11"}
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Contact edited",
                        content: {
                            "application/json": {
                                schema: { type: "object"},
                                example: {ID: 1, Name: "Elizabeth 2nd", Telephone: "332-9844-33"}
                            }
                        }
                    },
                    "404": {
                        description: "Contact not found"
                    },
                    "409": {
                        description: "Contact duplication"
                    }
                }
            },
            delete: {
                tags: ["CRUD operations"],
                description: "Delete record",
                operationId: "DeleteRecord",
                parameters: [
                    {
                      name: "id",
                      in: "header",
                      required: true,
                      description: "Contact ID to delete",
                    },
                ],
                responses: {
                    "204": {
                        description: "Contact deleted"
                    },
                    "404": {
                        description: "Contact not found"
                    }
                }
            }
        }
    }
}

module.exports = openapi