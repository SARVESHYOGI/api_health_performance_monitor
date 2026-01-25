from fastapi import FastAPI
from app.routes import api_monitor, metrics
from app.db.base import Base
from app.db.session import engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Health & Performance Monitor")

app.include_router(api_monitor.router, prefix="/api")
app.include_router(metrics.router, prefix="/metrics")
