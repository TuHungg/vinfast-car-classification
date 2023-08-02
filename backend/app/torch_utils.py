from PIL import Image
import requests
import matplotlib.pyplot as plt
from io import BytesIO
import torch
from torch import nn
from transformers import ViTForImageClassification
import numpy as np
from torchvision import transforms
import io

from transformers import pipeline


# load model
model = pipeline(model='hungtu/vinfast-car-classifier')


def get_image_from_url(url_image):
    image = Image.open(requests.get(url_image, stream=True).raw)
    return image


def transform_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes))
    return image


def get_prediction(image):
    result = model(image)
    
    return result
