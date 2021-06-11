const app = require("express")()
const swaggerUi = require("swagger-ui-express")
const openApiDoc = require("./openapi")

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDoc))

app.listen(3000)