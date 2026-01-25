from pydantic import BaseModel, HttpUrl
from typing import Optional, Dict, Any


class ApiCheckRequest(BaseModel):
    url: HttpUrl
    method: str
    headers: Optional[Dict[str, str]] = None
    body: Optional[Dict[str, Any]] = None


class ApiCheckResponse(BaseModel):
    status_code: int
    response_time_ms: float
    success: bool
    message: str
    timestamp: str
