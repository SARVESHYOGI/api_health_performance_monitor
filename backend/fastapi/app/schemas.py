from pydantic import BaseModel
from typing import Optional, Dict, Any

class ApiRequest(BaseModel):
    url: str
    method: str
    headers: Optional[Dict[str, str]] = None
    body: Optional[Any] = None
