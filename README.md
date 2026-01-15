# 🚀 API Health & Performance Monitor

A backend-focused system to monitor API performance, latency, and failures by actively calling external APIs and aggregating performance metrics.

This project demonstrates **backend observability**, **performance measurement**, and **system design thinking** beyond basic CRUD applications.

---

## 📌 Problem Statement

In real-world systems, developers often:

- Build APIs without measuring performance
- Assume endpoints are fast
- Lack visibility into slow or failing APIs
- Discover issues only after users complain

👉 **Observability is critical in production systems.**

This project addresses that gap by providing a lightweight API monitoring solution.

---

## ✅ Solution Overview

The system actively monitors APIs by:

- Calling target APIs from the backend
- Measuring response time and status codes
- Tracking failures and errors
- Storing metrics for analysis
- Displaying aggregated insights in a dashboard

⚠️ This is **monitoring and observability**, not just logging.

---

## 🏗️ Architecture

Frontend (React - Port 3000)
|
| API details (URL, method, headers, body)
v
API Monitor (Express.js - Port 5000)
|
| Backend-to-backend HTTP call
v
Target API (Port 8080)
|
| Response
v
API Monitor

Measures response time

Stores metrics

Returns analysis


---

## 🔁 Request Flow

1. Frontend sends API configuration (URL, method, headers, body)
2. Express backend receives the request
3. Backend starts timing
4. Backend calls the target API
5. Backend receives response
6. Response time is calculated
7. Metrics are stored in the database
8. Performance data is returned to frontend
9. Aggregated insights are available via dashboard APIs

---

## 📥 Input (Example)

Request sent from frontend:

```json
{
  "url": "http://localhost:8080/login",
  "method": "POST",
  "headers": {
    "Authorization": "Bearer <JWT_TOKEN>",
    "Content-Type": "application/json"
  },
  "body": {
    "email": "user@example.com",
    "password": "secret"
  }
}
📤 Output (Example)

Response returned by the backend:

{
  "status_code": 200,
  "response_time_ms": 312,
  "success": true,
  "timestamp": "2026-01-10T10:15:30"
}
