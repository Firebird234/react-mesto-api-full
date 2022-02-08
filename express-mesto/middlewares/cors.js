// module.exports.cors = (req, res, next) => {
//   const allowedCors = [
//     'https://best-site.ever.nomoredomains.work',
//     'http://best-site.ever.nomoredomains.work',
//     'https://localhost:3000',
//     'http://localhost:3000',
//     'http://localhost:3001',
//     'https://localhost:3001',
//   ];
//   const { origin } = req.headers; // Сохраняем источник запроса в переменную origin

//   const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
// Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

//   // сохраняем список заголовков исходного запроса
//   const requestHeaders = req.headers['access-control-request-headers'];
//   console.log('outside if');
//   // проверяем, что источник запроса есть среди разрешённых
//   if (allowedCors.includes(origin)) {
//     console.log('inside if');
//     // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
//     res.header('Access-Control-Allow-Origin', '*');
//   }

//   // Если это предварительный запрос, добавляем нужные заголовки
//   if (method === 'OPTIONS') {
//     // разрешаем кросс-доменные запросы любых типов (по умолчанию)
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);

//     // разрешаем кросс-доменные запросы с этими заголовками
//     res.header('Access-Control-Allow-Headers', requestHeaders);

//     // завершаем обработку запроса и возвращаем результат клиенту
//     return res.end();
//   }

//   return next();
// };

// const allowedCors = [
//   'https://best-site.ever.nomoredomains.work',
//   'http://best-site.ever.nomoredomains.work',
//   'https://localhost:3000',
//   'http://localhost:3000',
//   'http://localhost:3001',
//   'https://localhost:3001',
// ];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports.cors = (req, res, next) => {
  // const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  // if (allowedCors.includes(origin)) {
  res.header('Access-Control-Allow-Origin', '*');
  // }

  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
