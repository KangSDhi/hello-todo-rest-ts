const paramsJsonSchema: Object = {
    type: 'object',
    properties: {
        id: {
            type: 'number'
        }
    }
};

const schema: Object = {
    schema: {
        params: paramsJsonSchema
    }
}

export default schema;