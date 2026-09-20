// // k6 сангийн HTTP хүсэлт илгээх модуль болон шалгах/хүлээх функцуудыг импортолж байна
// import http from 'k6/http';
// import { sleep, check } from 'k6';

// // Тестийн тохиргоо (Options) - Ачааллын параметрийн болон босго утгуудыг тодорхойлно
// export const options = {
//   vus: 5,          // Virtual Users (Виртуал хэрэглэгч): Зэрэгцэн ажиллах хэрэглэгчдийн тоо (Энд 5 хэрэглэгч ажиллана)
//   duration: "30s",   // Test duration (Тестийн үргэлжлэх хугацаа): Тест нийт 30 секунд үргэлжилнэ
  
//   // Thresholds (SLO / Чанарын босго): Тест амжилттай дуусахын тулд хангасан байх ёстой шалгуур үзүүлэлтүүд
//   thresholds: {
//     http_req_duration: ['p(95)<800'],   // Хүсэлтүүдийн 95%-ийн хүлээх хугацаа (p95 latency) 800ms-ээс бага байх ёстой
//     http_req_failed:   ['rate<0.01'],   // Алдаатай хүсэлтийн хувь (Error rate) 1%-иас бага байх ёстой
//   },
// };

// // Үндсэн функц (Default function) - Виртуал хэрэглэгч бүрийн давтан гүйцэтгэх логик
// export default function () {
//   // 1. Target URL руу HTTP GET хүсэлт илгээж, үр дүнг 'res' хувьсагчид хадгална
//   const res = http.get('https://test.k6.io');

//   // 2. Response буюу хариу ирсэн эсэхийг шалгах (Assertion хийх)
//   // Энд серверээс ирсэн status код 200 (амжилттай) мөн эсэхийг шалгаж байна
//   check(res, { 
//     'status 200 байна': (r) => r.status === 200 
//   });

//   // 3. Хэрэглэгч хүсэлт илгээснийхээ дараа 1 секунд түр хүлээнэ (Think time / Sleep)
//   // Ингэснээр хэт шахаж ачаалахгүйгээр бодит хэрэглэгчийн үйлдлийг дуурайдаг
//   sleep(1);
// }

// import http from 'k6/http';
// import { sleep, check } from 'k6';

// export const options = { vus: 5, duration: "30s" };

// export default function () {
//   const res = http.get('https://test.k6.io');
//   check(res, { 'status 200 байна': (r) => r.status === 200 });
//   sleep(1);
// } 

// import http from 'k6/http';
// import { sleep, check } from 'k6';

// export const options = {
//   stages: [
//     { duration: '30s', target: 5 },    // халаалт (5 VU)
//     { duration: '1m',  target: 30 },   // өсгөлт (30 VU)
//     { duration: '30s', target: 100 },  // оргил (100 VU)
//     { duration: '30s', target: 0 },    // буулт (0 VU)
//   ],
// };

// export default function () {
//   const res = http.get('https://test.k6.io');
//   check(res, { 'status 200 байна': (r) => r.status === 200 });
//   sleep(1);
// }

import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 30,             // 30 хэрэглэгчийн ачаалал
  duration: "1m",      // 1 минутын хугацаа
  thresholds: {
    // Baseline (508.89ms) * 1.5 = ~763ms гэж SLO тогтоов
    http_req_duration: ['p(95)<763'], 
    // Алдааны хувь 1%-аас бага байх ёстой
    http_req_failed:   ['rate<0.01'],  
  },
};

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, { 'status 200 байна': (r) => r.status === 200 });
  sleep(1);
}

