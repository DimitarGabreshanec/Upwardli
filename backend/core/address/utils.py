from typing import Tuple, Optional

import geocoder
from django.conf import settings


def geocode_latlng_from_location(text: str) -> Tuple[Optional[float], Optional[float]]:
    """
    Returns latitude and longitude for the specified search string.
    Uses geocoder.
    """

    try:
        results = geocoder.mapbox(text, key=settings.MAPBOX_PUBLIC_API_KEY)
    except ValueError:  #
        return None, None

    if len(results) == 0:
        return None, None

    lat = results[0].latlng[0]
    lng = results[0].latlng[1]

    return lat, lng
