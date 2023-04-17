"""
    Module docstring
"""

from pydantic import BaseModel, Field, EmailStr
from bson import ObjectId

class PyObjectId(ObjectId):
    """Class docstring"""
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value):
        """Class docstring"""
        if not ObjectId.is_valid(value):
            raise ValueError("Invalid objectid")
        return ObjectId(value)

    @classmethod
    def __modify_schema__(cls, field_schema):
        """Method docstring"""
        field_schema.update(type="string")

class Image(BaseModel):
    """Class docstring"""
    id: PyObjectId = Field(default_factory=PyObjectId, alias='_id')
    imageId: str =  Field(...)
    imagePath: str = Field(...)
    className: str = Field(...)
    objectName: str = Field(...)
    predominantColors: list[str] = Field(...)
    data: list[dict] = Field(...)

    
    class Config:
        """Class Config docstring"""
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "className": "Jane Doe",
                "predominantColor": "jdoe@example.com",
                "category": "lipstick"
            }
        }


