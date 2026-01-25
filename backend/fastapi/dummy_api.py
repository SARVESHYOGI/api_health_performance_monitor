from fastapi import FastAPI
import time

app = FastAPI()

@app.get("/health")
def health():
    time.sleep(0.3)
    return {"status": "ok"}

@app.post("/login")
def login(data: dict):
    time.sleep(0.5)
    return {"token": "fake-jwt-token"}
