import httpx
from typing import Optional, Dict, Any


async def forward_request(
    method: str,
    url: str,
    headers: Optional[Dict[str, str]] = None,
    body: Optional[Dict[str, Any]] = None,
    timeout: int = 5,
):
    async with httpx.AsyncClient(timeout=timeout) as client:
        response = await client.request(
            method=method.upper(),
            url=url,
            headers=headers,
            json=body,
        )
        return response
