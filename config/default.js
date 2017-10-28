/**
 * Created by Zihang Zhang on 2017/10/17.
 */
module.exports = {
  database: {
    dbName: 'innovation_platform',
    username: 'root',
    password: '0901',
    salt: 'Pumas are large, cat-like animals ' +
    'which are found in America. When reports ' +
    'came into London Zoo that a wild puma had ' +
    'been spotted forty-five miles south of London, ' +
    'they were not taken seriously. However, as the ' +
    'evidence began to accumulate, experts from the ' +
    'Zoo felt obliged to investigate, for the ' +
    'descriptions given by people who claimed to ' +
    'have seen the puma were extraordinarily similar.',
    options: {
      timezone: '+08:00'
    }
  },

  cookie: {
    secret: 'secret',
    expires: 3600 * 24 * 7
  }

};