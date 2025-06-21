const {default: axios} = require("axios");
require("dotenv").config();

const getAddressDetail = async (lat , lon) => {
     const result = await axios.get(`${process.env.MAP_IR_URL}?lat=${lat}&lon=${lon}`, {
          headers: {
            "x-api-key" : process.env.MAP_API_KEY
          }
        }).then(res => res.data)
        return {
            province: result.province, 
            city: result.city, 
            region: result.region,
            address: result.address
        }
};

module.exports = {getAddressDetail}