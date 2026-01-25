from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.db.base import Base

class ApiLog(Base):
    __tablename__ = "api_logs"

    id = Column(Integer, primary_key=True, index=True)
    endpoint = Column(String, index=True)
    method = Column(String)
    status_code = Column(Integer)
    response_time_ms = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)
