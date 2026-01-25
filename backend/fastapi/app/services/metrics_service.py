from sqlalchemy.orm import Session
from app.models.api_log import ApiLog
import numpy as np


def get_summary_metrics(db: Session):
    logs = db.query(ApiLog).all()
    if not logs:
        return {
            "total_requests": 0,
            "avg_latency": 0,
            "p95_latency": 0,
            "p99_latency": 0,
            "error_rate": 0,
        }

    times = [log.response_time_ms for log in logs]
    errors = [log for log in logs if log.status_code >= 400]

    return {
        "total_requests": len(logs),
        "avg_latency": round(sum(times) / len(times), 2),
        "p95_latency": round(float(np.percentile(times, 95)), 2),
        "p99_latency": round(float(np.percentile(times, 99)), 2),
        "error_rate": round(len(errors) / len(logs), 3),
    }
