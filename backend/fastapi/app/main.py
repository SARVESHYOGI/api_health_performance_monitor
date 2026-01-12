from fastapi import FastAPI
from app.monitor import router as monitor_router
from app.metrics import router as metrics_router

app = FastAPI(title="API Health & Performance Monitor")

app.include_router(monitor_router)
app.include_router(metrics_router)