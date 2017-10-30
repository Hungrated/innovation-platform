/**
 * Created by Zihang Zhang on 2017/10/30.
 */

const excelParser = require('excel-parser');

exports.parse = function (fileURL) {
  excelParser.parse({
    inFile: fileURL,
    worksheet: 1,
    skipEmpty: true,
    // searchFor: {
    //   term: ['my serach term'],
    //   type: 'loose'
    // }
  },function(err, records){
    if(err) console.error(err);
    console.log(records);
    return records;
  });
};
