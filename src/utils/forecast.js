
const request = require('request');

const TOKEN_DARKSKY = '55fc15ddc27b49be3acd2e2b33d133fa';
const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/${TOKEN_DARKSKY}/${latitude},${longitude}?units=si&lang=fr`;

  request({ url, json: true }, (error, { body }) => {

    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('location not found', undefined);
    } else {
      const { temperature, precipProbability } = body.currently;
      let daily;
      let summary;
      if (body.daily.data && body.daily.data.length > 0) {
        daily = body.daily.data[0];
        summary = daily && daily.summary;
        callback(undefined, `${summary} La température extérieure est de ${temperature} degrès actuelement. Il y a ${precipProbability}% chance de pleuvoir.`);
      } else {
        callback(undefined, `La température extérieure est de ${temperature} degrès actuelement. Il y a ${precipProbability}% chance de pleuvoir.`);
      }
    }
  });
}

module.exports = forecast;
