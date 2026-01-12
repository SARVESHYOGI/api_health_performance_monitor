from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.database import get_db
from app.models import ApiMetric

router = APIRouter(prefix="/metrics", tags=["metrics"])

@router.get("/summary")
async def summary(db: AsyncSession = Depends(get_db)):
    total_q = await db.execute(select(func.count(ApiMetric.id)))
    total_requests = total_q.scalar() or 0

    avg_q = await db.execute(select(func.avg(ApiMetric.response_time_ms)))
    avg_response_time = float(avg_q.scalar() or 0)

    error_q = await db.execute(
        select(func.count(ApiMetric.id)).where(ApiMetric.status_code >= 400)
    )
    error_count = error_q.scalar() or 0

    error_rate = (error_count / total_requests * 100) if total_requests else 0

    return {
        "total_requests": total_requests,
        "avg_response_time_ms": round(avg_response_time, 2),
        "error_rate_percent": round(error_rate, 2)
    }


@router.get("/slow-endpoints")
async def slow_endpoints(db: AsyncSession = Depends(get_db)):
    q = await db.execute(
        select(
            ApiMetric.endpoint,
            func.avg(ApiMetric.response_time_ms).label("avg_ms")
        ).group_by(ApiMetric.endpoint)
        .order_by(func.avg(ApiMetric.response_time_ms).desc())
        .limit(5)
    )
    result = [{"endpoint": row.endpoint, "avg_response_time_ms": round(row.avg_ms, 2)} for row in q.fetchall()]
    return result


@router.get("/errors")
async def error_endpoints(db: AsyncSession = Depends(get_db)):
    q = await db.execute(
        select(
            ApiMetric.endpoint,
            func.count(ApiMetric.id).label("error_count")
        ).where(ApiMetric.status_code >= 400)
        .group_by(ApiMetric.endpoint)
        .order_by(func.count(ApiMetric.id).desc())
    )
    result = [{"endpoint": row.endpoint, "error_count": row.error_count} for row in q.fetchall()]
    return result
