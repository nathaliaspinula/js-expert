const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv';
    
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);

        const result = File.csvToJson(filePath);

        await rejects(result, rejection);
    }
    {
        const filePath = './mocks/fourItems-invalid.csv';

        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);

        const result = File.csvToJson(filePath);

        await rejects(result, rejection);
    }
    {
        const filePath = './mocks/threeItems-valid.csv';

        const result = await File.csvToJson(filePath);
        
        const expected = [
            {
              "id": 1,
              "name": "pessoa 1",
              "profession": "desenvolvedor",
              "birthDay": 1996
            },
            {
              "id": 2,
              "name": "pessoa 2",
              "profession": "funcional",
              "birthDay": 1991
            },
            {
              "id": 3,
              "name": "pessoa 3",
              "profession": "qa",
              "birthDay": 1993
            }
          ];

          
            deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
        };
})();