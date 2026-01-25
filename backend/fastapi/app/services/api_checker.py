import time
from datetime import datetime
from typing import Dict, Any
import httpx

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.utils.http_client import forward_request
from app.schemas.api_check import ApiCheckRequest
from app.db.session import SessionLocal
from app.models.api_log import ApiLog


async def check_api_service(data: ApiCheckRequest) -> Dict[str, Any]:
    method = data.method.upper()

    if method not in ["GET", "POST", "PUT", "PATCH", "DELETE"]:
        raise HTTPException(status_code=400, detail="Unsupported HTTP method")

    if not str(data.url).startswith("http://localhost"):
        raise HTTPException(status_code=403, detail="Only localhost URLs are allowed")

    start_time = time.time()
    db: Session = SessionLocal()

    try:
        response = await forward_request(
            method=method,
            url=str(data.url),
            headers=data.headers,
            body=data.body,
        )

        duration_ms = (time.time() - start_time) * 1000

        log = ApiLog(
            endpoint=str(data.url),
            method=method,
            status_code=response.status_code,
            response_time_ms=round(duration_ms, 2),
            timestamp=datetime.utcnow(),
        )

        db.add(log)
        db.commit()

        return {
            "status_code": response.status_code,
            "response_time_ms": round(duration_ms, 2),
            "success": response.status_code < 400,
            "message": "Request successful" if response.status_code < 400 else "Request failed",
            "timestamp": datetime.utcnow().isoformat(),
        }

    except httpx.TimeoutException:
        duration_ms = (time.time() - start_time) * 1000

        log = ApiLog(
            endpoint=str(data.url),
            method=method,
            status_code=504,
            response_time_ms=round(duration_ms, 2),
            timestamp=datetime.utcnow(),
        )

        db.add(log)
        db.commit()

        return {
            "status_code": 504,
            "response_time_ms": round(duration_ms, 2),
            "success": False,
            "message": "Target API timeout",
            "timestamp": datetime.utcnow().isoformat(),
        }

    except Exception as e:
        duration_ms = (time.time() - start_time) * 1000

        log = ApiLog(
            endpoint=str(data.url),
            method=method,
            status_code=500,
            response_time_ms=round(duration_ms, 2),
            timestamp=datetime.utcnow(),
        )

        db.add(log)
        db.commit()

        return {
            "status_code": 500,
            "response_time_ms": round(duration_ms, 2),
            "success": False,
            "message": f"Request failed: {str(e)}",
            "timestamp": datetime.utcnow().isoformat(),
        }

    finally:
        db.close()
