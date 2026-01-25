from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.services.metrics_service import get_summary_metrics

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/summary")
def metrics_summary(db: Session = Depends(get_db)):
    return get_summary_metrics(db)
