import time
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
import httpx

from app.schemas import ApiRequest
from app.database import get_db
from app.models import ApiMetric

router = APIRouter(prefix="/monitor", tags=["monitor"])

WHITELIST = ["localhost", "127.0.0.1"]

@router.post("/check-api")
async def check_api(request: ApiRequest, db: AsyncSession = Depends(get_db)):
    method = request.method.upper()
    if method not in ["GET", "POST", "PUT", "DELETE"]:
        raise HTTPException(status_code=400, detail="Invalid HTTP method")

    if not any(host in request.url for host in WHITELIST):
        raise HTTPException(status_code=403, detail="URL not allowed")

    async with httpx.AsyncClient(timeout=5.0) as client:
        start_time = time.perf_counter()
        try:
            response = await client.request(
                method=method,
                url=request.url,
                headers=request.headers,
                json=request.body
            )
            response_time_ms = int((time.perf_counter() - start_time) * 1000)

        except httpx.RequestError as e:
            response_time_ms = int((time.perf_counter() - start_time) * 1000)
            metric = ApiMetric(
                endpoint=request.url,
                method=method,
                status_code=0,
                response_time_ms=response_time_ms
            )
            db.add(metric)
            await db.commit()
            raise HTTPException(status_code=502, detail=f"Request failed: {str(e)}")

    metric = ApiMetric(
        endpoint=request.url,
        method=method,
        status_code=response.status_code,
        response_time_ms=response_time_ms
    )
    db.add(metric)
    await db.commit()

    return {
        "endpoint": request.url,
        "method": method,
        "status_code": response.status_code,
        "response_time_ms": response_time_ms
    }
