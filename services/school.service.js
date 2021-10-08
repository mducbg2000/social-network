const School = require('../models/school')
const Major = require('../models/major')
const schema = require('mongoose').Schema
module.exports = {
    getAllMajorWithSchool: async () => {
        try {
            return await Major.find().select('name');
        } catch (e) {
            throw e
        }
    },

    getMajorAndSchoolByCode: async (code) => {
      try {
          let m = await Major.findOne({code: code});
          let s = await School.findById(m.school);
          return {
              major: m._id,
              school: s._id
          }
      }  catch (e) {
          throw e
      }
    },

    getAllSchoolsWithMajors: async () => {
        try {
            return await School.find().select({_id: 0, name: 1}).populate('majors', {_id: 0, name: 1});
        } catch (e) {
            throw e
        }
    },

    getListsCode: async () => {
        try {
            let res = await Major.find().select({_id: 0, code: 1});
            return res.map(obj => obj.code);
        } catch (e) {
            throw e
        }
    }
}



