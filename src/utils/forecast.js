
const request = require('request');
const moment = require('moment');
const TOKEN_DARKSKY = '55fc15ddc27b49be3acd2e2b33d133fa';
const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/${TOKEN_DARKSKY}/${latitude},${longitude}?units=si&lang=fr`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('location not found', undefined);
    } else {
      const { temperature, precipProbability, time } = body.currently;
      let daily;
      let summary;
      if (body.daily.data && body.daily.data.length > 0) {
        daily = body.daily.data[0];
        summary = daily && daily.summary;
        moment.locale('fr')
        callback(undefined, `${summary}. Il est ${moment(time * 1000).format('HH:mm:ss')}. La température extérieure est de ${temperature} degrès actuellement. Il y a ${precipProbability}% chances de pleuvoir. ${summary}`);
      } else {
        callback(undefined, `La température extérieure est de ${temperature} degrès actuellement. Il y a ${precipProbability}% chances de pleuvoir.`);
      }
    }
  });
}

module.exports = forecast;
