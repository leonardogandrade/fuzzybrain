"""
    Main module
"""


from fastapi import FastAPI
from routes.image import image
from routes.user import user
from routes.uploads import upload
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = {
    'http://localhost:3000',
    'http://localhost'
}


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(image)
app.include_router(user)
app.include_router(upload)
