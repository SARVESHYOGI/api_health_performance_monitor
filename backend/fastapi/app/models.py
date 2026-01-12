from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database import Base

class ApiMetric(Base):
    __tablename__ = "api_metrics"

    id = Column(Integer, primary_key=True, index=True)
    endpoint = Column(String, index=True)
    method = Column(String)
    status_code = Column(Integer)
    response_time_ms = Column(Integer)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
