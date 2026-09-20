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

// import http from 'k6/http';
// import { sleep, check } from 'k6';

// export const options = {
//   vus: 30,             // 30 хэрэглэгчийн ачаалал дор шалгана
//   duration: "1m",      // 1 минутын турш
//   thresholds: {
//     // Baseline p95 (508.89ms) * 1.5 = ~763ms гэж тооцон босго тогтоов
//     http_req_duration: ['p(95)<763'], 
    
//     // Алдааны хувь 1%-аас бага байх ёстой
//     http_req_failed:   ['rate<0.01'],  
//   },
// };

// export default function () {
//   const res = http.get('https://test.k6.io');
//   check(res, { 'status 200 байна': (r) => r.status === 200 });
//   sleep(1);
// }

import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  // 1. Энгийн endpoint рүү хүсэлт явуулах
  const res1 = http.get('http://localhost:3000/');
  check(res1, { 'status 200 (root)': (r) => r.status === 200 });

  // 2. 100ms удаашруулдаг endpoint рүү хүсэлт явуулах
  const res2 = http.get('http://localhost:3000/slow');
  check(res2, { 'status 200 (slow)': (r) => r.status === 200 });

  sleep(1);
}
